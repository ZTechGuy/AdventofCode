$script:elfFoods = New-Object System.Collections.Specialized.OrderedDictionary
$Calories = 0
$script:elfNo = 1
function NextVar(){
    $script:elfFoods += @{ "elfCal$elfNo" = "$Calories";}
    $script:elfNo++
}
$Text = Get-Content -Path $PSScriptRoot/input.txt
foreach ($Value in $Text)
{
    if (-not ([string]::IsNullOrEmpty($Value)))
    { 
        $Calories = $Calories + $Value
    }
    else
    {
        NextVar
        $Calories = 0
    }
}
$elfSort = @( $elfFoods.GetEnumerator()|Sort-Object {[int] $_.value} -Descending )
$top1Elf = [int]$elfSort.value[0]
$top2Elf = [int]$elfSort.value[1]
$top3Elf = [int]$elfSort.value[2]
$Final = $top1Elf + $top2Elf + $top3Elf
Write-Output $Final