import { IsDate, IsDateString, validate, validateSync } from 'class-validator';
import { plainToInstance, Transform } from 'class-transformer';
import { LocalDate, LocalDateTime } from '@js-joda/core';

class Validation {
  @Transform(({ value }) => {
    return LocalDate.parse(value);
  })
  date: LocalDate;
}

const value = plainToInstance(Validation, {
  date: '2023-02-02',
});

console.log(value.date);
