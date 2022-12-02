$script:Points = 0
$Text = Get-Content -Path $PSScriptRoot/input.txt
foreach ($Value in $Text)
{
    [int]$P1 = 0
    [int]$P2 = 0
    $Round = $Value.Split(" ")
    foreach ($Move in $Round)
    {
        switch ($Move)
        {
            "A"{$P1 = 1}
            "B"{$P1 = 2}
            "C"{$P1 = 3}
            "X"{$P2 = 1; $script:Points = $script:Points + 1}
            "Y"{$P2 = 2; $script:Points = $script:Points + 2}
            "Z"{$P2 = 3; $script:Points = $script:Points + 3}
        }
    }
    switch ($P1)
    {
        3{
            switch ($P2)
            {
                3{$script:Points = $script:Points + 3; break}
                1{$script:Points = $script:Points + 6; break}
            }; break
        }
        2{
            switch ($P2)
            {
                2{$script:Points = $script:Points + 3; break}
                3{$script:Points = $script:Points + 6; break}
            }; break
        }
        1{
            switch ($P2)
            {
                1{$script:Points = $script:Points + 3; break}
                2{$script:Points = $script:Points + 6; break}
            }; break
        }
    }
}
Write-Output $Points