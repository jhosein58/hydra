pub struct Rng;

impl Rng {
    // CSPRNG
    pub fn fill(buf: &mut [u8]) -> Result<(), getrandom::Error> {
        getrandom::fill(buf)?;
        Ok(())
    }
}
