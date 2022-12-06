$script:elfNo = 0
$Text = Get-Content -Path $PSScriptRoot/input.txt
$script:goofPointTotals = 0
$script:points = New-Object system.collections.hashtable
$script:items = New-Object system.collections.hashtable
$script:groupNo = @()
$points.a = 1
$points.b = 2
$points.c = 3
$points.d = 4
$points.e = 5
$points.f = 6
$points.g = 7
$points.h = 8
$points.i = 9
$points.j = 10
$points.k = 11
$points.l = 12
$points.m = 13
$points.n = 14
$points.o = 15
$points.p = 16
$points.q = 17
$points.r = 18
$points.s = 19
$points.t = 20
$points.u = 21
$points.v = 22
$points.w = 23
$points.x = 24
$points.y = 25
$points.z = 26
$points.A = 27
$points.B = 28
$points.C = 29
$points.D = 30
$points.E = 31
$points.F = 32
$points.G = 33
$points.H = 34
$points.I = 35
$points.J = 36
$points.K = 37
$points.L = 38
$points.M = 39
$points.N = 40
$points.O = 41
$points.P = 42
$points.Q = 43
$points.R = 44
$points.S = 45
$points.T = 46
$points.U = 47
$points.V = 48
$points.W = 49
$points.X = 50
$points.Y = 51
$points.Z = 52
function Get-BagContents () {
    $items[$elfNo] += $line.ToCharArray()
    #Write-Output "Got contents of Elf $elfNo's bag"
    $script:elfNo++
}
function Compare-BagContents () {
    #Write-Output "Comparing bag contents"
    foreach ($object in $items[2]) {
            $script:goofs = ""
            if ($items[1] -cContains $object -and $items[0] -cContains $object) {
                $items = $line.ToCharArray()
                #Write-Output "Match found: $object"
                $script:goofs = "$object"
                [int]$goofPoints = $points."$goofs"
                $script:goofPointTotals = $goofPointTotals + $goofPoints
            }
        }
}
function Get-NextGroup () {
    $script:elfNo = 0
    $script:items = New-Object system.collections.hashtable
}
foreach ($line in $Text) {
    switch ($elfNo)
    {
        {0, 1}{Get-BagContents}
        2 {Compare-BagContents; Get-NextGroup; break}
    }
}
Write-Output $items
Write-Output $goofPointTotals