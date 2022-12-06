$script:Elf1 = @()
$script:Elf2 = @()
$script:elfNo = 2
$script:dup = 0
$script:notDup = 0
$script:comparison = 0
$script:range = @()
function Compare-Elves() {
    $script:comparison++
    #Write-Output "Comparison: $comparison"
    $script:dupBool = "False"
    foreach ($value1 in $Elf1) {
        foreach ($value2 in $Elf2) {
            if ([int]$value2 -eq [int]$value1){
                $matches++
            }
        }
    }
    switch ($matches){
        {$_ -gt 0}{$script:dup++; $script:matches = 0; break}
        0 {$script:notDup++; break}
    }    
    $script:Elf1 = @()
    $script:Elf2 = @()
}
function Get-ValueAsString() {
    $startEnd = $member.Split("-")
    $script:range = @($startEnd[0]..$startEnd[1])
    #[string]$script:valString = $range -join ","
    
}
function Get-WhichElf () {
    switch ($elfNo % 2) {
        0 {$script:Elf1 = $range; $script:elfNo++; break}
        default {$script:Elf2 = $range; Compare-Elves; $script:elfNo++ }
    }
    $script:range= @()
}
function Get-ElfRange(){
    
    #Write-Output "Elf range: $member"
    Get-ValueAsString
    #Write-Output $valString
    #Write-Output $elfNo   
    Get-WhichElf
    $script:valString = ""
    
}
$Text = Get-Content -Path $PSScriptRoot/input.txt
foreach ($group in $Text)
{   
    $Elf = $group.Split(",")
    foreach ($member in $Elf){
        Get-ElfRange
    }
}
Write-Output "Duplicates: $dup"
Write-Output "Not Duplicates: $notDup"