import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";
import { Client } from "./Client";

export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateTransactionInput:
 *      type: object
 *      required:
 *        - type
 *        - amount
 *      properties:
 *        type:
 *          type: string
 *          default: deposit
 *        amount:
 *          type: number
 *          default: 200
 */
@Entity("transaction")
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: TransactionType,
  })
  type: string;

  @Column({
    type: "numeric",
  })
  amount: number;

  @ManyToOne(() => Client, (client) => client.transactions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "client_id",
  })
  client: Client;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
