pub struct RNG;

impl RNG {
    pub fn fill(buf: &mut [u8]) -> Result<(), getrandom::Error> {
        getrandom::fill(buf)?;
        Ok(())
    }
}
