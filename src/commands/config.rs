use anyhow::Result;
use colored::*;
use crate::utils::config::Config;

pub fn get(key: &str) -> Result<()> {
    let config = Config::load()?;
    
    match config.get_value(key) {
        Some(value) => println!("{} = {}", key.cyan(), value),
        None => {
            println!("{} Unknown key: {}", "Error".red().bold(), key);
            println!("\nAvailable: network, template");
            anyhow::bail!("Unknown key");
        }
    }
    Ok(())
}

pub fn set(key: &str, value: &str) -> Result<()> {
    let mut config = Config::load()?;
    config.set_value(key, value.to_string())?;
    config.save()?;
    
    println!("{} Updated", "Success".green().bold());
    println!("{} = {}", key.cyan(), value);
    Ok(())
}

pub fn list() -> Result<()> {
    let config = Config::load()?;
    
    println!("{}", "Configuration".bold());
    println!("\n  network = {}", config.defaults.network.cyan());
    println!("  template = {}", config.defaults.template.cyan());
    Ok(())
}

pub fn reset() -> Result<()> {
    use dialoguer::Confirm;
    
    if !Confirm::new().with_prompt("Reset config?").interact()? {
        println!("{}", "Cancelled".yellow());
        return Ok(());
    }
    
    Config::default().save()?;
    println!("{} Reset to defaults", "Success".green().bold());
    Ok(())
}
