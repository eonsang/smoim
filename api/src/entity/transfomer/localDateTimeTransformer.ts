import { ValueTransformer } from 'typeorm';
import { convert, LocalDateTime, nativeJs } from '@js-joda/core';

export class LocalDateTimeTransformer implements ValueTransformer {
  to(value: LocalDateTime) {
    return convert(value).toDate();
  }
  from(value: string): LocalDateTime {
    return nativeJs(value).toLocalDateTime();
  }
}
