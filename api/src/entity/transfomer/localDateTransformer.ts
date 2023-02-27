import { ValueTransformer } from 'typeorm';
import { convert, LocalDate, LocalDateTime, nativeJs } from '@js-joda/core';

export class LocalDateTransformer implements ValueTransformer {
  to(value: LocalDate) {
    return convert(value).toDate();
  }
  from(value: string): LocalDate {
    return nativeJs(value).toLocalDate();
  }
}
