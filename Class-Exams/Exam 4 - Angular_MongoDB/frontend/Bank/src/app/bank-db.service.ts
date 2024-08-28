import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface AccountOperation{
  id?: string;
  accountNumber:number;
  actionType: 'withdrawal' | 'deposit' | 'loan';
  amount: number;
  date: Date;
  interest?: number;
  numberOfPayments?: number;
}

@Injectable({
  providedIn: 'root'
})

export class BankDBService {
  private API_URL = 'http://localhost:8080/api/account';
  constructor(private http: HttpClient) {}

  async getOperationsByAccountNumber(accountNumber: number): Promise<AccountOperation[] | undefined> {
    return firstValueFrom(this.http.get<AccountOperation[]>(`${this.API_URL}/get/${accountNumber}`));
  }

  async addOperation(operation: AccountOperation): Promise<{ message: string }> {
    try {
      const response = await firstValueFrom(this.http.post<AccountOperation>(`${this.API_URL}/add`, operation));
      return { message: 'Operation added successfully' };
    } catch (error) {
      console.error('Error adding operation:', error);
      return {message: 'Failed to add operation' };
    }
  }
}
