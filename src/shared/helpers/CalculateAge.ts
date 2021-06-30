import moment from 'moment';

export default function CalculateAge(dateOfBirth: Date) {
   return moment().diff(dateOfBirth, 'years');
}

export { CalculateAge };
