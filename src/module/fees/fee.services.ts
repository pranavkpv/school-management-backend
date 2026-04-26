import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { FeeRepository } from './fees.repository';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { FeeCollection, PaymentStatus } from './fees.schema';



@Injectable()
export class FeeService {
  private readonly baseUrl: string;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly frontendUrl: string;
  constructor(
    private readonly feeRepository: FeeRepository,
    private readonly configService: ConfigService
  ) {
    const mode = this.configService.get<string>('PAYPAL_MODE', 'sandbox');
    this.baseUrl =
      mode === 'live'
        ? 'https://api-m.paypal.com'
        : 'https://api-m.sandbox.paypal.com';

    this.clientId = this.configService.get<string>('PAYPAL_CLIENT_ID')!;
    this.clientSecret = this.configService.get<string>('PAYPAL_CLIENT_SECRET')!;
    this.frontendUrl = this.configService.get<string>('FRONTEND_URL', 'http://localhost:3000');
  }

  async getPendingFees(
    studentId: string
  ) {

    const fees =
      await this.feeRepository
        .getPendingFeesByStudentId(
          studentId
        );

    return fees.map(fee => ({
      _id: fee._id,
      amount:
        fee.amount,

      paymentStatus:
        fee.paymentStatus,

      monthOfPayment:
        fee.monthOfPayment
    }));
  }

  private async getAccessToken(): Promise<string> {
    const { data } = await axios.post(
      `${ this.baseUrl }/v1/oauth2/token`,
      'grant_type=client_credentials',
      {
        auth: { username: this.clientId, password: this.clientSecret },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );
    return data.access_token;
  }

  // ── Create PayPal order ─────────────────────────────────────────

  async createPaypalOrder(feeId: string): Promise<{ approvalUrl: string; orderId: string }> {
    const fee = await this.feeRepository.findById(feeId);
    if (!fee) throw new NotFoundException('Fee not found');
    if (fee.paymentStatus === PaymentStatus.PAID)
      throw new BadRequestException('Fee is already paid');

    const token = await this.getAccessToken();

    const { data } = await axios.post(
      `${ this.baseUrl }/v2/checkout/orders`,
      {
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: feeId,
            description: `Fee for ${ fee.monthOfPayment }`,
            amount: {
              currency_code: 'USD',          // PayPal doesn't support INR — change if needed
              value: fee.amount.toFixed(2),
            },
          },
        ],
        application_context: {
          return_url: `${ this.frontendUrl }/fees/payment-success?feeId=${ feeId }`,
          cancel_url: `${ this.frontendUrl }/fees?cancelled=true`,
          brand_name: 'School Fee Portal',
          user_action: 'PAY_NOW',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${ token }`,
          'Content-Type': 'application/json',
        },
      },
    );

    const approvalUrl = (data.links as any[]).find(
      (l) => l.rel === 'approve',
    )?.href;

    if (!approvalUrl) throw new BadRequestException('Failed to get PayPal approval URL');

    return { approvalUrl, orderId: data.id };
  }

  // ── Capture payment after PayPal redirects back ─────────────────

  async capturePaypalOrder(orderId: string, feeId: string): Promise<FeeCollection> {
    const token = await this.getAccessToken();

    const { data } = await axios.post(
      `${ this.baseUrl }/v2/checkout/orders/${ orderId }/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${ token }`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (data.status !== 'COMPLETED') {
      throw new BadRequestException(`PayPal capture failed: ${ data.status }`);
    }

    const updated = await this.feeRepository.markAsPaid(feeId);
    if (!updated) throw new NotFoundException('Fee not found after capture');

    return updated;
  }
}