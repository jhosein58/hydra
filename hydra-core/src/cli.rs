use clap::Parser;

#[derive(Parser, Debug)]
#[command(author, version, about)]
pub struct Cli {
    #[arg(short, long, default_value_t = 3000)]
    pub port: u16,

    #[arg(short, long, default_value = "http://localhost:5173")]
    pub origin: String,
}
