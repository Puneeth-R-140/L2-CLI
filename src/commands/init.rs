use anyhow::{Context, Result};
use colored::*;
use dialoguer::{Input, Select};
use std::fs;
use std::path::PathBuf;

pub fn run(
    name: Option<String>,
    _network: Option<String>,
    _template: Option<String>,
    _typescript: bool,
    _tailwind: bool,
) -> Result<()> {
    let project_name = name.unwrap_or_else(|| {
        Input::new()
            .with_prompt("Project name")
            .interact_text()
            .unwrap()
    });
    
    let networks = vec!["base", "optimism"];
    let idx = Select::new()
        .with_prompt("Select network")
        .items(&networks)
        .default(0)
        .interact()
        .unwrap();
    let network = networks[idx];
    
    println!("\n{} Creating L2 app", "Success".green().bold());
    println!("  Name: {}", project_name.cyan());
    println!("  Network: {}\n", network.cyan());
    
    let dir = PathBuf::from(&project_name);
    if dir.exists() {
        anyhow::bail!("Directory exists");
    }
    
    fs::create_dir_all(&dir)
        .with_context(|| format!("Failed to create {}", dir.display()))?;
    
    create_template(&dir, &project_name, network)?;
    
    println!("{} Done!\n", "Success".green().bold());
    println!("Next: cd {}", project_name.cyan());
    Ok(())
}

fn create_template(dir: &PathBuf, name: &str, network: &str) -> Result<()> {
    let (chain, rpc, explorer) = match network {
        "base" => ("8453", "https://mainnet.base.org", "https://basescan.org"),
        "optimism" => ("10", "https://mainnet.optimism.io", "https://optimistic.etherscan.io"),
        _ => ("1", "http://localhost:8545", ""),
    };
    
    let html = format!(
        "<!DOCTYPE html>\n<html>\n<head>\n<title>{}</title>\n</head>\n<body>\
        \n<h1>{}</h1>\n<p>Network: {}</p>\n<p>Chain ID: {}</p>\n</body>\n</html>",
        name, name, network, chain
    );
    
    fs::write(dir.join("index.html"), html)?;
    
    let readme = format!(
        "# {}\n\nL2 app on {}\n\nChain: {}\nRPC: {}\nExplorer: {}\n",
        name, network, chain, rpc, explorer
    );
    
    fs::write(dir.join("README.md"), readme)?;
    Ok(())
}
