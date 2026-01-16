use anyhow::{Context, Result};
use colored::*;
use dialoguer::{Input, Select};
use include_dir::{include_dir, Dir};
use std::fs;
use std::path::PathBuf;

static REACT_TEMPLATE: Dir = include_dir!("$CARGO_MANIFEST_DIR/templates/react");

pub fn run(
    name: Option<String>,
    network: Option<String>,
    template: Option<String>,
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
    let network_idx = if let Some(n) = network {
        networks.iter().position(|&x| x == n).unwrap_or(0)
    } else {
        Select::new()
            .with_prompt("Select network")
            .items(&networks)
            .default(0)
            .interact()
            .unwrap()
    };
    let network_choice = networks[network_idx];
    
    let templates = vec!["javascript", "react"];
    let template_idx = if let Some(t) = template {
        templates.iter().position(|&x| x == t).unwrap_or(0)
    } else {
        Select::new()
            .with_prompt("Select template")
            .items(&templates)
            .default(0)
            .interact()
            .unwrap()
    };
    let template_choice = templates[template_idx];
    
    println!("\n{} Creating L2 app", "Success".green().bold());
    println!("  Name: {}", project_name.cyan());
    println!("  Network: {}", network_choice.cyan());
    println!("  Template: {}\n", template_choice.cyan());
    
    let dir = PathBuf::from(&project_name);
    if dir.exists() {
        anyhow::bail!("Directory already exists");
    }
    
    fs::create_dir_all(&dir)
        .with_context(|| format!("Failed to create {}", dir.display()))?;
    
    match template_choice {
        "react" => create_react_template(&dir, &project_name, network_choice)?,
        _ => create_javascript_template(&dir, &project_name, network_choice)?,
    }
    
    println!("{} Done!\n", "Success".green().bold());
    println!("Next steps:");
    println!("  cd {}", project_name.cyan());
    
    if template_choice == "react" {
        println!("  npm install");
        println!("  npm run dev");
    } else {
        println!("  Open index.html in browser");
    }
    
    Ok(())
}

fn create_react_template(dir: &PathBuf, name: &str, network: &str) -> Result<()> {
    let (network_import, network_name, network_display, chain_id, rpc_url, explorer_url, docs_url) = match network {
        "base" => ("base", "base", "Base", "8453", "https://mainnet.base.org", "https://basescan.org", "https://docs.base.org"),
        "optimism" => ("optimism", "optimism", "Optimism", "10", "https://mainnet.optimism.io", "https://optimistic.etherscan.io", "https://docs.optimism.io"),
        _ => ("base", "base", "Base", "8453", "https://mainnet.base.org", "https://basescan.org", "https://docs.base.org"),
    };
    
    // Extract template files
    for entry in REACT_TEMPLATE.entries() {
        extract_entry(entry, dir, name, network_import, network_name, network_display, chain_id, rpc_url, explorer_url, docs_url)?;
    }
    
    Ok(())
}

fn extract_entry(
    entry: &include_dir::DirEntry,
    base_dir: &PathBuf,
    project_name: &str,
    network_import: &str,
    network_name: &str,
    network_display: &str,
    chain_id: &str,
    rpc_url: &str,
    explorer_url: &str,
    docs_url: &str,
) -> Result<()> {
    match entry {
        include_dir::DirEntry::Dir(d) => {
            let dir_path = base_dir.join(d.path());
            fs::create_dir_all(&dir_path)?;
            for child in d.entries() {
                extract_entry(child, base_dir, project_name, network_import, network_name, network_display, chain_id, rpc_url, explorer_url, docs_url)?;
            }
        }
        include_dir::DirEntry::File(f) => {
            let file_path = base_dir.join(f.path());
            let contents = f.contents_utf8().context("File is not UTF-8")?;
            
            // Replace template variables
            let processed = contents
                .replace("{{project_name}}", project_name)
                .replace("{{network_import}}", network_import)
                .replace("{{network_name}}", network_name)
                .replace("{{network_display}}", network_display)
                .replace("{{chain_id}}", chain_id)
                .replace("{{rpc_url}}", rpc_url)
                .replace("{{explorer_url}}", explorer_url)
                .replace("{{docs_url}}", docs_url);
            
            fs::write(&file_path, processed)?;
        }
    }
    Ok(())
}

fn create_javascript_template(dir: &PathBuf, name: &str, network: &str) -> Result<()> {
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
