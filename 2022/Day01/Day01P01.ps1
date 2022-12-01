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
$Final = $elfFoods.GetEnumerator()|Sort-Object {[int] $_.value} -Descending
Write-Output $Final