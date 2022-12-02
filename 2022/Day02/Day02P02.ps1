$script:Points = 0
$Text = Get-Content -Path $PSScriptRoot/input.txt
foreach ($Value in $Text)
{
    [string]$P1 = ""
    [string]$P2 = ""
    $Round = $Value.Split(" ")
    foreach ($Move in $Round)
    {
        switch ($Move)
        {
            "A"{$P1 = "Rock"}
            "B"{$P1 = "Paper"}
            "C"{$P1 = "Scissors"}
            "X"{$P2 = "Lose"} 
            "Y"{$P2 = "Draw"; $script:Points = $script:Points + 3} 
            "Z"{$P2 = "Win"; $script:Points = $script:Points + 6} 
        }
    }
    switch ($P1)
    {
        "Scissors"{
            switch ($P2)
            {
                "Lose"{$script:Points = $script:Points + 2; break}
                "Draw"{$script:Points = $script:Points + 3; break}
                "Win"{$script:Points = $script:Points + 1; break}
            }; break
        }
        "Paper"{
            switch ($P2)
            {
                "Lose"{$script:Points = $script:Points + 1; break}
                "Draw"{$script:Points = $script:Points + 2; break}
                "Win"{$script:Points = $script:Points + 3; break}
            }; break
        }
        "Rock"{
            switch ($P2)
            {
                "Lose"{$script:Points = $script:Points + 3; break}
                "Draw"{$script:Points = $script:Points + 1; break}
                "Win"{$script:Points = $script:Points + 2; break}
            }; break
        }
    }
}
Write-Output $Points