import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankDBService } from '../../bank-db.service';

interface AccountOperation{
  id?: string;
  accountNumber:number;
  actionType: 'withdrawal' | 'deposit' | 'loan';
  amount: number;
  date: Date;
  interest?: number;
  numberOfPayments?: number;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  accountNumber: number = 0;
  operations: AccountOperation[] = [];
  showAccountOperations: boolean = false;

  constructor(private bankDBService: BankDBService){}

  async getAccountData(accountNumber: number){
    const operations = await this.bankDBService.getOperationsByAccountNumber(accountNumber);
    if (operations && operations.length > 0){
      this.showAccountOperations = true;
      this.operations = operations.map((operation: AccountOperation) => ({
        ...operation,}));
    }else{
      this.operations = [];
      this.showAccountOperations = false;
    }
  }
}
