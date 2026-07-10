import { faker } from "@faker-js/faker";
import { User } from "../model/User";

const TITLES = ["Mr", "Mrs"];

const COUNTRIES = [
    "India",
    "United States",
    "Canada",
    "Australia",
    "Singapore",
    "Israel",
    "New Zealand",
];

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export class DataGenerator {

    static generateUser(): User {

        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        return {

            name: `${firstName} ${lastName}`,

            email: faker.internet.email({
                firstName,
                lastName,
                provider: "mailinator.com",
            }).toLowerCase(),

            password: "Test@123",

            title: faker.helpers.arrayElement(TITLES),

            birth_date: faker.number.int({
                min: 1,
                max: 30,
            }).toString(),

            birth_month: faker.helpers.arrayElement(MONTHS),

            birth_year: faker.number.int({
                min: 1985,
                max: 2015,
            }).toString(),

            firstname: firstName,

            lastname: lastName,

            company: faker.company.name(),

            address1: faker.location.streetAddress(),

            address2: faker.location.secondaryAddress(),

            country: faker.helpers.arrayElement(COUNTRIES),

            zipcode: faker.location.zipCode(),

            state: faker.location.state(),

            city: faker.location.city(),

            mobile_number: faker.string.numeric(10),

        };
    }
}