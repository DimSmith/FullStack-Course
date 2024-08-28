import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankDBService } from '../../bank-db.service';
import { Router } from '@angular/router';

interface AccountOperation {
  accountNumber: number;
  actionType: 'withdrawal' | 'deposit' | 'loan';
  amount: number;
  date: Date;
  interest?: number;
  numberOfPayments?: number;
}

@Component({
  selector: 'app-new-opr',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-opr.component.html',
  styleUrl: './new-opr.component.css'
})
export class NewOprComponent {

  operation: AccountOperation = {
    accountNumber: 1,
    actionType: 'withdrawal',
    amount: 1,
    date: new Date()
  };

  onActionTypeChange(): void {
    if (this.operation.actionType !== 'loan') {
      this.operation.interest = undefined;
      this.operation.numberOfPayments = undefined;
    }
  }

  constructor(
    private bankDBService: BankDBService,
    private router: Router
  ) {}

  async onSubmit(operation: AccountOperation): Promise<void> {
    try {
      await this.bankDBService.addOperation(operation);
      console.log('Operation submitted successfully');
      this.router.navigate(['/main']);
    } catch (error) {
      console.error('Error submitting operation:', error);
    }
  }

}
