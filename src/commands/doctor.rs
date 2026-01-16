use anyhow::Result;
use colored::*;
use crate::utils::config::Config;

pub fn run() -> Result<()> {
    println!("{}", "Environment Health Check".bold());
    println!();
    
    let mut all_passed = true;
    
    let rust_check = check_rust();
    print_check("Rust compiler", rust_check);
    if !rust_check {
        all_passed = false;
    }
    
    let cargo_check = check_cargo();
    print_check("Cargo package manager", cargo_check);
    if !cargo_check {
        all_passed = false;
    }
    
    let node_check = check_node();
    print_check("Node.js runtime", node_check);
    if !node_check {
        println!("      {} Node.js 18+ recommended", "Info".yellow());
    }
    
    let config_check = check_config();
    print_check("Configuration file", config_check);
    if !config_check {
        println!("      {} Config created on first use", "Info".cyan());
    }
    
    println!();
    if all_passed && node_check {
        println!("{} All checks passed!", "Success".green().bold());
    } else if all_passed {
        println!("{} Core environment ready", "Ready".cyan().bold());
    } else {
        println!("{} Some checks failed", "Warning".yellow().bold());
    }
    
    Ok(())
}

fn print_check(name: &str, passed: bool) {
    let status = if passed { "PASS".green() } else { "FAIL".red() };
    println!("  {} ... [{}]", name, status);
}

fn check_rust() -> bool {
    std::process::Command::new("rustc")
        .arg("--version")
        .output()
        .is_ok()
}

fn check_cargo() -> bool {
    std::process::Command::new("cargo")
        .arg("--version")
        .output()
        .is_ok()
}

fn check_node() -> bool {
    std::process::Command::new("node")
        .arg("--version")
        .output()
        .is_ok()
}

fn check_config() -> bool {
    Config::get_config_path().ok()
        .and_then(|path| if path.exists() { Some(()) } else { None })
        .is_some()
}
