$script:Elf1Start = ""
$script:Elf1End = ""
$script:Elf2Start = ""
$script:Elf2End = ""
$script:elfNo = 2
$script:dup = 0
$script:notDup = 0
$script:comparison = 0
function Compare-Elves() {
    $script:comparison++
    #Write-Output "Comparison: $comparison"   
        if ((($Elf1Start -le $Elf2Start) -and ($Elf1End -ge $Elf2End)) -or (($Elf2Start -le $Elf1Start) -and ($Elf2End -ge $Elf1End))){
            $script:dup++
            #Debug output
            #Write-Output "Duplicates found"
            #Write-Output "$Elf1Start-$Elf1End"
            #Write-Output "$Elf2Start-$Elf2End"
            #Write-Output $dup
        } else {
            $script:notDup++
            #Write-Output "No Duplicates found"
        }
    
    $script:Elf1 = ""
    $script:Elf2 = ""
}
function Get-ValueAsString() {
    $startEnd = $member.Split("-")
    #$range = @($startEnd[0]..$startEnd[1])
    #[string]$script:valString = $range -join ","
    [int]$script:start = $startEnd[0]
    #Write-Output $start
    [int]$script:end = $startEnd[1]
    #Write-Output $End
    
}
function Get-WhichElf () {
    switch ($elfNo % 2) {
        0 { $script:Elf1Start = $start; $script:Elf1End = $end; $script:elfNo++; break }
        default { $script:Elf2Start = $start; $script:Elf2End = $end; Compare-Elves; $script:elfNo++ }
    }
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