describe('Sample', () => {
  it('1 + 1 to be 2', () => {
    expect(1 + 1).toBe(2);
  });

  it('NODE_ENV must be equal to test', () => {
    console.log(process.env.NODE_ENV);
    expect(process.env.NODE_ENV).toEqual('test');
  });
});
