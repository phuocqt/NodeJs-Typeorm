import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Client } from "./Client";
import { Person } from "./utils/Person";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateBankerInput:
 *      type: object
 *      required:
 *        - firstName
 *        - lastName
 *        - email
 *        - cardNumber
 *        - employeeNumber
 *      properties:
 *        firstName:
 *          type: string
 *          default: Jane
 *        lastName:
 *          type: string
 *          default: Doe
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        cardNumber:
 *          type: string
 *          default: 1234567890
 *        employeeNumber:
 *          type: string
 *          default: 1234567890
 */
@Entity("banker")
export class Banker extends Person {
  @Column({
    length: 10,
    unique: true,
  })
  employee_number: string;

  @ManyToMany((type) => Client, {
    cascade: true,
  })
  @JoinTable({
    name: "bankers_clients",
    joinColumn: {
      name: "banker",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "client",
      referencedColumnName: "id",
    },
  })
  clients: Client[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
