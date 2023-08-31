import { Invoice } from './classes/invoice.js'
import { ListTemplate } from './classes/ListTemplate.js';
import { Payment } from './classes/Payment.js'
import { HasFormatter } from './interfaces/HasFormatter.js'

let docOne: HasFormatter;
let docTwo: HasFormatter;

docOne = new Invoice('yoshi', 'web work',250);
docTwo = new Payment('mario', 'plumbing work',200);

let docs:HasFormatter[] = [];
docs.push(docOne)
docs.push(docTwo)

console.log(docs)
console.log((docs[0] as any).client)

//interfaces
interface IsPerson {
    name: string;
    age: number;
    speak(a: string): void;
    spend(a: number): number;
}

const me: IsPerson = {
    name: 'shaun',
    age: 30,
    speak(text: string): void {
        console.log(text);
    },
    spend(amount: number): number {
        console.log('I spent ', amount);
        return amount;
    },
};

console.log(me);
me.speak('hello, world');

const greetPerson = (person: IsPerson): void => {
    console.log('hello ', person.name);
}

greetPerson(me);


const invOne = new Invoice('mario', 'work on website', 250);
const invTwo = new Invoice('luigi', 'work on another website', 300);

let invoices: Invoice[] = [];
invoices.push(invOne);
invoices.push(invTwo);

invoices.forEach(inv => {
    console.log(inv.client, /*inv.details,*/ inv.amount, inv.format());
})


const form = document.querySelector('.new-item-form') as HTMLFormElement;
// console.log(form.children);

//inputs
const type = document.querySelector('#type') as HTMLSelectElement;
const tofrom = document.querySelector('#tofrom') as HTMLInputElement;
const details = document.querySelector('#details') as HTMLInputElement;
const amount = document.querySelector('#amount') as HTMLInputElement;

//list template instance
const ul = document.querySelector('ul')!;
const list = new ListTemplate(ul);

form.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    let values:[string,string,number] =[tofrom.value,details.value,amount.valueAsNumber]

    let doc:HasFormatter;
    if(type.value==='invoice'){
        // doc = new Invoice(tofrom.value, details.value,amount.valueAsNumber);
        doc = new Invoice(...values);
    }else{
        doc = new Payment(...values);
    }

    console.log(doc);

    list.render(doc, type.value, 'end');
})
