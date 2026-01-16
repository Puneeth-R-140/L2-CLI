use anyhow::{Context, Result};
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Config {
    pub defaults: DefaultsConfig,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DefaultsConfig {
    pub network: String,
    pub template: String,
}

impl Default for Config {
    fn default() -> Self {
        Self {
            defaults: DefaultsConfig {
                network: "base".to_string(),
                template: "javascript".to_string(),
            },
        }
    }
}

impl Config {
    pub fn get_config_dir() -> Result<PathBuf> {
        let home = dirs::home_dir().context("No home directory")?;
        Ok(home.join(".l2-cli"))
    }
    
    pub fn get_config_path() -> Result<PathBuf> {
        Ok(Self::get_config_dir()?.join("config.toml"))
    }
    
    pub fn load() -> Result<Self> {
        let path = Self::get_config_path()?;
        if !path.exists() {
            return Ok(Self::default());
        }
        
        let contents = fs::read_to_string(&path)
            .with_context(|| format!("Failed to read {:?}", path))?;
        toml::from_str(&contents).context("Failed to parse config")
    }
    
    pub fn save(&self) -> Result<()> {
        let dir = Self::get_config_dir()?;
        fs::create_dir_all(&dir)?;
        
        let path = Self::get_config_path()?;
        let contents = toml::to_string_pretty(self)?;
        fs::write(&path, contents)?;
        Ok(())
    }
    
    pub fn get_value(&self, key: &str) -> Option<String> {
        match key {
            "network" => Some(self.defaults.network.clone()),
            "template" => Some(self.defaults.template.clone()),
            _ => None,
        }
    }
    
    pub fn set_value(&mut self, key: &str, value: String) -> Result<()> {
        match key {
            "network" => {
                if !["base", "optimism"].contains(&value.as_str()) {
                    anyhow::bail!("Network must be base or optimism");
                }
                self.defaults.network = value;
            }
            "template" => {
                if !["javascript", "react", "nextjs"].contains(&value.as_str()) {
                    anyhow::bail!("Template must be javascript, react, or nextjs");
                }
                self.defaults.template = value;
            }
            _ => anyhow::bail!("Unknown key: {}", key),
        }
        Ok(())
    }
}
