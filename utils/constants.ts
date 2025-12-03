export const SCRIPTS = {
  powershell: `# Azure Automation Runbook - Auto-Renew Client Secrets
# Requires Modules: Microsoft.Graph.Authentication, Microsoft.Graph.Applications

try {
    # Connect to Graph using Managed Identity
    Connect-MgGraph -Identity
    
    $apps = Get-MgApplication -All
    $thresholdDays = 14
    
    foreach ($app in $apps) {
        $creds = $app.PasswordCredentials
        
        foreach ($cred in $creds) {
            $expiry = [DateTime]$cred.EndDate
            $daysUntilExpiry = ($expiry - (Get-Date)).Days
            
            if ($daysUntilExpiry -gt 0 -and $daysUntilExpiry -lt $thresholdDays) {
                Write-Output "Secret for app '$($app.DisplayName)' expiring in $daysUntilExpiry days. Renewing..."
                
                # Create new secret
                $params = @{
                    PasswordCredential = @{
                        DisplayName = "AutoRenewed_$(Get-Date -Format 'yyyyMMdd')"
                    }
                }
                $newCred = New-MgApplicationPassword -ApplicationId $app.Id -BodyParameter $params
                
                # TODO: Push $newCred.SecretText to Azure Key Vault here
                # Update-AzKeyVaultSecret -VaultName "MyVault" -Name "MySecret" -SecretValue $newCred.SecretText
                
                Write-Output "Successfully renewed secret for $($app.DisplayName)."
            }
        }
    }
}
catch {
    Write-Error $_.Exception.Message
}`,

  kusto: `// Kusto Query to monitor Automation Jobs
AzureDiagnostics 
| where ResourceProvider == "MICROSOFT.AUTOMATION" 
| where Category == "JobStreams" 
| where ResultDescription has "Renewing" or ResultDescription has "Error"
| project TimeGenerated, RunbookName_s, ResultDescription, ResultType
| order by TimeGenerated desc`
};