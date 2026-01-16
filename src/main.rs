use clap::{Parser, Subcommand};
use colored::*;

mod commands;
mod utils;

#[derive(Parser)]
#[command(name = "l2")]
#[command(about = "L2 CLI - Scaffolding tool for Ethereum L2 developers (Base, Optimism)", long_about = None)]
#[command(version)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Initialize a new Ethereum L2 application
    Init {
        /// Name of the application
        name: Option<String>,

        /// L2 network to target (base, optimism)
        #[arg(short, long)]
        network: Option<String>,

        /// Template to use (javascript, react, nextjs)
        #[arg(short, long)]
        template: Option<String>,

        /// Use TypeScript
        #[arg(long)]
        typescript: bool,

        /// Include Tailwind CSS
        #[arg(long)]
        tailwind: bool,
    },

    /// Manage CLI configuration
    Config {
        #[command(subcommand)]
        action: ConfigCommands,
    },

    /// Check development environment health
    Doctor,
}

#[derive(Subcommand)]
enum ConfigCommands {
    /// Get a configuration value
    Get {
        /// Configuration key
        key: String,
    },
    /// Set a configuration value
    Set {
        /// Configuration key
        key: String,
        /// Configuration value
        value: String,
    },
    /// List all configuration
    List,
    /// Reset configuration to defaults
    Reset,
}

fn main() {
    let cli = Cli::parse();

    let result = match cli.command {
        Commands::Init {
            name,
            network,
            template,
            typescript,
            tailwind,
        } => commands::init::run(name, network, template, typescript, tailwind),
        Commands::Config { action } => match action {
            ConfigCommands::Get { key } => commands::config::get(&key),
            ConfigCommands::Set { key, value } => commands::config::set(&key, &value),
            ConfigCommands::List => commands::config::list(),
            ConfigCommands::Reset => commands::config::reset(),
        },
        Commands::Doctor => commands::doctor::run(),
    };

    if let Err(e) = result {
        eprintln!("{} {}", "Error:".red().bold(), e);
        std::process::exit(1);
    }
}
