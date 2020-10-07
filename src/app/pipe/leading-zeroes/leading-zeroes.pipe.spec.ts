import { LeadingZeroesPipe } from './leading-zeroes.pipe';

describe('LeadingzeroesPipe', () => {

  const pipe = new LeadingZeroesPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should not change the number without a parameter', () => {
    expect(pipe.transform(9)).toBe('9');
  });

  it('should not change the number if it has more digits than desired', () => {
    expect(pipe.transform(12345, 3)).toBe('12345');
  });

  it('should not change the number if it has exactly as many digits as desired', () => {
    expect(pipe.transform(7890, 4)).toBe('7890');
  });

  it('should prepend zeroes if the number has fewer digits than desired', () => {
    expect(pipe.transform(1337, 7)).toBe('0001337');
  });
});
