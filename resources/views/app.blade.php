<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="keywords"
        content="travel, Academ IXblog, Academ IXwebsite, Academ IXagency, Academ IXbooking, Academ IXguide, Academ IXtips, Academ IXtips and tricks, Academ IXtips for beginners, Academ IXtips for solo travelers, Academ IXtips for couples, Academ IXtips for families, Academ IXtips for backpackers">

    <title>{{ $title ?? 'Academ IX' }}</title>

    <!-- icon -->
    <link rel="icon" type="image/favicon" href="{{ asset('/favicon.ico') }}">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>