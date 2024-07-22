import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Banker } from "./Banker";
import { Transaction } from "./Transaction";
import { Person } from "./utils/Person";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateClientInput:
 *      type: object
 *      required:
 *        - first_name
 *        - last_name
 *        - email
 *        - card_number
 *        - balance
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        first_name:
 *          type: string
 *          default: Jane
 *        last_name:
 *          type: string
 *          default: Doe
 *        card_number:
 *          type: string
 *          default: 1234567890
 *        balance:
 *          type: string
 *          default: 1234567890
 *    CreateClientResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
@Entity("client")
export class Client extends Person {
  @Column({
    type: "numeric",
  })
  balance: number;

  @Column({
    name: "active",
    default: true,
  })
  is_active: boolean;

  @Column({
    type: "simple-json",
    nullable: true,
  })
  additional_info: {
    age: number;
    hair_color: string;
  };

  @Column({ type: "simple-array", default: [] })
  family_members: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany((type) => Banker, {
    cascade: true,
  })
  bankers: Banker[];

  @OneToMany(() => Transaction, (transaction) => transaction.client)
  transactions: Transaction[];
}
