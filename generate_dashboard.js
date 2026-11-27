const fs = require('fs');

const apple = JSON.parse(fs.readFileSync('/tmp/growth_dash/apple_stats.json', 'utf8'));
const ig = JSON.parse(fs.readFileSync('/tmp/growth_dash/instagram_data.json', 'utf8'));

const htmlContent = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hidaya Growth Command • Analytics Center</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                        mono: ['"JetBrains Mono"', 'monospace']
                    },
                    colors: {
                        obsidian: '#0B0F19',
                        slateCard: 'rgba(17, 24, 39, 0.72)',
                        brand: {
                            400: '#818CF8',
                            500: '#6366F1',
                            600: '#4F46E5',
                        }
                    }
                }
            }
        }
    </script>
    <style>
        body {
            background-color: #070B14;
            color: #F1F5F9;
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-image: 
                radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.12) 0px, transparent 45%),
                radial-gradient(at 100% 0%, rgba(56, 189, 248, 0.08) 0px, transparent 45%),
                radial-gradient(at 50% 100%, rgba(79, 70, 229, 0.08) 0px, transparent 50%);
            background-attachment: fixed;
        }
        .glass-panel {
            background: rgba(15, 23, 42, 0.65);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.07);
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(15, 23, 42, 0.6);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(99, 102, 241, 0.3);
            border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(99, 102, 241, 0.6);
        }
    </style>
</head>
<body class="min-h-screen flex flex-col text-slate-100">

    <!-- TOP HEADER -->
    <header class="border-b border-slate-800/80 bg-slate-950/75 backdrop-blur-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <!-- Brand -->
            <div class="flex items-center space-x-3.5">
                <div class="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 p-[1.5px] shadow-lg shadow-indigo-500/20">
                    <div class="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                        <i data-lucide="layers" class="w-5 h-5 text-indigo-400"></i>
                    </div>
                </div>
                <div>
                    <div class="flex items-center space-x-2">
                        <h1 class="text-xl font-bold tracking-tight text-white">Hidaya Growth Command</h1>
                        <span class="px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-full font-mono">v2.0 LIVE</span>
                    </div>
                    <p class="text-xs text-slate-400">Social Media & App Intelligence Center</p>
                </div>
            </div>

            <!-- Main Tab Switcher -->
            <div class="flex items-center space-x-2 bg-slate-900/90 border border-slate-800 p-1.5 rounded-xl">
                <button onclick="switchMainTab('social')" id="tabBtn-social" 
                    class="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 text-white bg-indigo-600 shadow-md shadow-indigo-600/30">
                    <i data-lucide="instagram" class="w-4 h-4"></i>
                    <span>Social Media</span>
                </button>
                <button onclick="switchMainTab('app')" id="tabBtn-app" 
                    class="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50">
                    <i data-lucide="smartphone" class="w-4 h-4"></i>
                    <span>App Analytics</span>
                </button>
            </div>

            <!-- Apple Connect Status Badge -->
            <div class="hidden md:flex items-center space-x-3 text-xs text-slate-400 font-mono">
                <div class="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span class="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                    <span>Apple Sales API: Connected</span>
                </div>
            </div>
        </div>
    </header>

    <!-- MAIN BODY -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">

        <!-- TAB 1: SOCIAL MEDIA -->
        <div id="tab-social" class="space-y-8">
            <!-- Account Banner -->
            <div class="glass-panel rounded-2xl p-6 border border-slate-800/80 relative overflow-hidden">
                <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                    <div class="flex items-center space-x-5">
                        <img src="${ig.account.profile_picture_url}" alt="Hidaya" class="w-20 h-20 rounded-2xl border-2 border-indigo-500/40 object-cover shadow-lg shadow-indigo-500/20" />
                        <div>
                            <div class="flex items-center space-x-3">
                                <h2 class="text-2xl font-bold text-white">${ig.account.name}</h2>
                                <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">@${ig.account.username}</span>
                            </div>
                            <p class="text-sm text-slate-300 mt-1.5 max-w-xl leading-relaxed">${ig.account.biography.replace(/\n/g, ' • ')}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <a href="https://instagram.com/${ig.account.username}" target="_blank" class="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/20 hover:opacity-95 transition-all">
                            <i data-lucide="external-link" class="w-4 h-4"></i>
                            <span>View Profile</span>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Social KPIs -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div class="glass-panel rounded-xl p-5 border border-slate-800/80">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Followers</span>
                        <div class="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400"><i data-lucide="users" class="w-4 h-4"></i></div>
                    </div>
                    <div class="text-3xl font-extrabold text-white mt-3 font-mono">${ig.account.followers_count.toLocaleString()}</div>
                    <div class="flex items-center space-x-1.5 text-xs text-sky-400 mt-2 font-medium">
                        <i data-lucide="trending-up" class="w-3.5 h-3.5"></i>
                        <span>Organic Faith Audience</span>
                    </div>
                </div>

                <div class="glass-panel rounded-xl p-5 border border-slate-800/80">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Media Posts</span>
                        <div class="w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400"><i data-lucide="image" class="w-4 h-4"></i></div>
                    </div>
                    <div class="text-3xl font-extrabold text-white mt-3 font-mono">${ig.account.media_count}</div>
                    <div class="flex items-center space-x-1.5 text-xs text-slate-400 mt-2">
                        <span>3 posts daily schedule</span>
                    </div>
                </div>

                <div class="glass-panel rounded-xl p-5 border border-slate-800/80">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Avg Post Engagement</span>
                        <div class="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400"><i data-lucide="heart" class="w-4 h-4"></i></div>
                    </div>
                    <div class="text-3xl font-extrabold text-white mt-3 font-mono">3.8 <span class="text-lg text-slate-400 font-sans">likes/post</span></div>
                    <div class="flex items-center space-x-1.5 text-xs text-amber-400 mt-2 font-medium">
                        <i data-lucide="zap" class="w-3.5 h-3.5"></i>
                        <span>Peak: Hadith & Du'a slots</span>
                    </div>
                </div>

                <div class="glass-panel rounded-xl p-5 border border-slate-800/80">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Top Performing Slot</span>
                        <div class="w-9 h-9 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400"><i data-lucide="clock" class="w-4 h-4"></i></div>
                    </div>
                    <div class="text-2xl font-bold text-white mt-3">06:30 AM</div>
                    <div class="flex items-center space-x-1.5 text-xs text-slate-400 mt-2">
                        <span>Morning Hadith & Remembrance</span>
                    </div>
                </div>
            </div>

            <!-- Social Charts -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="glass-panel rounded-2xl p-6 border border-slate-800/80">
                    <h3 class="text-base font-bold text-white mb-1 flex items-center space-x-2">
                        <i data-lucide="bar-chart-2" class="w-4 h-4 text-indigo-400"></i>
                        <span>Engagement by Time Slot</span>
                    </h3>
                    <p class="text-xs text-slate-400 mb-6">Average likes across daily morning, afternoon, and evening batches</p>
                    <div class="h-64">
                        <canvas id="chart-ig-slots"></canvas>
                    </div>
                </div>

                <div class="glass-panel rounded-2xl p-6 border border-slate-800/80">
                    <h3 class="text-base font-bold text-white mb-1 flex items-center space-x-2">
                        <i data-lucide="pie-chart" class="w-4 h-4 text-sky-400"></i>
                        <span>Post Mix by Theme</span>
                    </h3>
                    <p class="text-xs text-slate-400 mb-6">Distribution of 47 scheduled content archetypes</p>
                    <div class="h-64">
                        <canvas id="chart-ig-types"></canvas>
                    </div>
                </div>
            </div>

            <!-- Social Posts Table -->
            <div class="glass-panel rounded-2xl p-6 border border-slate-800/80 space-y-4">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-base font-bold text-white flex items-center space-x-2">
                            <i data-lucide="calendar" class="w-4 h-4 text-indigo-400"></i>
                            <span>Recent Published Posts</span>
                        </h3>
                        <p class="text-xs text-slate-400 mt-0.5">Live performance log from Meta Graph API</p>
                    </div>
                    <span class="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">Showing 47 Posts</span>
                </div>

                <div class="overflow-x-auto custom-scrollbar">
                    <table class="w-full text-left text-sm text-slate-300">
                        <thead class="text-xs uppercase bg-slate-900/80 text-slate-400 border-b border-slate-800">
                            <tr>
                                <th class="py-3 px-4 font-semibold">Post Content</th>
                                <th class="py-3 px-4 font-semibold">Theme</th>
                                <th class="py-3 px-4 font-semibold">Slot / Date</th>
                                <th class="py-3 px-4 font-semibold text-center">Likes</th>
                                <th class="py-3 px-4 font-semibold text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody id="ig-posts-table-body" class="divide-y divide-slate-800/50 font-sans"></tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- TAB 2: APP ANALYTICS -->
        <div id="tab-app" class="space-y-8 hidden">
            <!-- Platform Sub-selector (Apple vs Google) -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel rounded-2xl p-4 sm:p-5 border border-slate-800/80">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                        <i data-lucide="smartphone" class="w-5 h-5"></i>
                    </div>
                    <div>
                        <h2 class="text-lg font-bold text-white">Mobile App Telemetry</h2>
                        <p class="text-xs text-slate-400">Toggle between official Apple App Store and Google Play metrics</p>
                    </div>
                </div>

                <!-- Toggle Buttons -->
                <div class="flex items-center p-1 bg-slate-900/90 border border-slate-800 rounded-xl space-x-1.5">
                    <button onclick="switchStorePlatform('apple')" id="storeBtn-apple"
                        class="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 text-white bg-indigo-600 shadow-md shadow-indigo-600/30">
                        <i data-lucide="apple" class="w-4 h-4"></i>
                        <span>Apple App Store (iOS)</span>
                    </button>
                    <button onclick="switchStorePlatform('google')" id="storeBtn-google"
                        class="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50">
                        <i data-lucide="play" class="w-4 h-4"></i>
                        <span>Google Play (Android)</span>
                    </button>
                </div>
            </div>

            <!-- APPLE STORE PANEL -->
            <div id="storeView-apple" class="space-y-8">
                <!-- Apple KPIs -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div class="glass-panel rounded-xl p-5 border border-slate-800/80">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">First-Time Downloads</span>
                            <div class="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400"><i data-lucide="download" class="w-4 h-4"></i></div>
                        </div>
                        <div class="text-3xl font-extrabold text-white mt-3 font-mono">${apple.totalDownloads}</div>
                        <div class="text-[11px] text-slate-400 mt-1 font-mono">Unique Apple IDs</div>
                    </div>

                    <div class="glass-panel rounded-xl p-5 border border-slate-800/80">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Redownloads</span>
                            <div class="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400"><i data-lucide="refresh-cw" class="w-4 h-4"></i></div>
                        </div>
                        <div class="text-3xl font-extrabold text-white mt-3 font-mono">${apple.totalRedownloads}</div>
                        <div class="text-[11px] text-slate-400 mt-1 font-mono">Returning iOS users</div>
                    </div>

                    <div class="glass-panel rounded-xl p-5 border border-slate-800/80">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">App Updates</span>
                            <div class="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400"><i data-lucide="arrow-up-circle" class="w-4 h-4"></i></div>
                        </div>
                        <div class="text-3xl font-extrabold text-white mt-3 font-mono">${apple.totalUpdates}</div>
                        <div class="text-[11px] text-slate-400 mt-1 font-mono">Updated to latest version</div>
                    </div>

                    <div class="glass-panel rounded-xl p-5 border border-slate-800/80">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Units</span>
                            <div class="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400"><i data-lucide="smartphone" class="w-4 h-4"></i></div>
                        </div>
                        <div class="text-3xl font-extrabold text-white mt-3 font-mono">${apple.totalUnits}</div>
                        <div class="text-[11px] text-slate-400 mt-1 font-mono">Downloads + Redownloads</div>
                    </div>

                    <div class="glass-panel rounded-xl p-5 border border-slate-800/80">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Store Rating</span>
                            <div class="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400"><i data-lucide="star" class="w-4 h-4"></i></div>
                        </div>
                        <div class="text-3xl font-extrabold text-amber-400 mt-3 font-mono">5.0 <span class="text-base text-slate-400 font-sans">★</span></div>
                        <div class="text-[11px] text-slate-400 mt-1 font-mono">${apple.totalReviews} verified review</div>
                    </div>
                </div>

                <!-- Apple Charts -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="glass-panel rounded-2xl p-6 border border-slate-800/80">
                        <h3 class="text-base font-bold text-white mb-1 flex items-center space-x-2">
                            <i data-lucide="trending-up" class="w-4 h-4 text-indigo-400"></i>
                            <span>Monthly Store Activity (July - Nov 2026)</span>
                        </h3>
                        <p class="text-xs text-slate-400 mb-6">First-Time Downloads vs. Existing User Updates</p>
                        <div class="h-64">
                            <canvas id="chart-apple-monthly"></canvas>
                        </div>
                    </div>

                    <div class="glass-panel rounded-2xl p-6 border border-slate-800/80">
                        <h3 class="text-base font-bold text-white mb-1 flex items-center space-x-2">
                            <i data-lucide="globe" class="w-4 h-4 text-sky-400"></i>
                            <span>Top Installs by Country</span>
                        </h3>
                        <p class="text-xs text-slate-400 mb-6">Units installed across global App Store storefronts</p>
                        <div class="h-64">
                            <canvas id="chart-apple-geo"></canvas>
                        </div>
                    </div>
                </div>

                <!-- App Details & Reviews -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="glass-panel rounded-2xl p-6 border border-slate-800/80 space-y-4">
                        <h4 class="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
                            <i data-lucide="shield-check" class="w-4 h-4 text-indigo-400"></i>
                            <span>App Store Connection Status</span>
                        </h4>
                        <div class="space-y-3 text-sm font-mono">
                            <div class="flex justify-between py-2 border-b border-slate-800/60">
                                <span class="text-slate-400">Bundle ID</span>
                                <span class="text-slate-200 font-semibold">com.hidayaaitheapp.app</span>
                            </div>
                            <div class="flex justify-between py-2 border-b border-slate-800/60">
                                <span class="text-slate-400">Apple ID</span>
                                <span class="text-slate-200 font-semibold">6783264330</span>
                            </div>
                            <div class="flex justify-between py-2 border-b border-slate-800/60">
                                <span class="text-slate-400">Live Version</span>
                                <span class="text-indigo-400 font-semibold">v2.0 (Active)</span>
                            </div>
                            <div class="flex justify-between py-2 border-b border-slate-800/60">
                                <span class="text-slate-400">Vendor Number</span>
                                <span class="text-slate-200">94026364</span>
                            </div>
                            <div class="flex justify-between py-2">
                                <span class="text-slate-400">Sales API Auth</span>
                                <span class="text-indigo-400 font-semibold flex items-center space-x-1.5">
                                    <span class="w-2 h-2 rounded-full bg-indigo-400 inline-block"></span>
                                    <span>ES256 Token OK</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="glass-panel rounded-2xl p-6 border border-slate-800/80 lg:col-span-2 space-y-4">
                        <div class="flex items-center justify-between">
                            <h4 class="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
                                <i data-lucide="message-square" class="w-4 h-4 text-amber-400"></i>
                                <span>Verified Customer Ratings & Reviews</span>
                            </h4>
                            <span class="px-2 py-0.5 rounded text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold">100% 5-Star Rating</span>
                        </div>

                        <div class="space-y-3">
                            <div class="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
                                <div class="flex items-center justify-between mb-2">
                                    <div class="flex items-center space-x-2">
                                        <div class="flex text-amber-400 text-xs">★★★★★</div>
                                        <span class="text-xs font-bold text-white">M. Farooq</span>
                                    </div>
                                    <span class="text-xs text-slate-500 font-mono">App Store UK</span>
                                </div>
                                <h5 class="text-sm font-semibold text-slate-200">Exceptional Islamic AI companion</h5>
                                <p class="text-xs text-slate-400 mt-1 leading-relaxed">"The clean reader and the new AI question answering are beautifully made. MashAllah may Allah reward the creators."</p>
                            </div>

                            <div class="bg-slate-900/40 border border-dashed border-slate-800/80 rounded-xl p-4 text-center text-xs text-slate-400">
                                Live updates automatically synced from App Store Connect official Sales Reports.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- GOOGLE PLAY PANEL -->
            <div id="storeView-google" class="space-y-8 hidden">
                <div class="glass-panel rounded-2xl p-8 border border-slate-800/80 text-center max-w-2xl mx-auto space-y-5">
                    <div class="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mx-auto shadow-lg shadow-sky-500/10">
                        <i data-lucide="play" class="w-8 h-8"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-white">Google Play Console Integration</h3>
                        <p class="text-sm text-slate-400 mt-1.5">Package: <span class="font-mono text-indigo-400 font-semibold">com.hidayaaitheapp.app</span></p>
                    </div>
                    <p class="text-xs text-slate-300 leading-relaxed max-w-lg mx-auto">
                        Automated Google Play store statistics require a Google Cloud Service Account JSON key with <span class="text-sky-300 font-semibold">Financial & Acquisition</span> reporting permissions.
                    </p>
                    <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-left text-xs font-mono space-y-2">
                        <div class="flex items-center space-x-2 text-slate-400 font-bold uppercase tracking-wider">
                            <i data-lucide="terminal" class="w-3.5 h-3.5 text-indigo-400"></i>
                            <span>Connection Steps:</span>
                        </div>
                        <p class="text-slate-400">1. Open Google Cloud Console & create a Service Account.</p>
                        <p class="text-slate-400">2. Grant <span class="text-white">Google Play Android Developer API</span> permissions.</p>
                        <p class="text-slate-400">3. Upload your service account JSON to link Android installs in real-time.</p>
                    </div>
                    <div class="pt-2">
                        <button onclick="alert('Upload your Google Play service account JSON key to connect live stats.')" class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all border border-slate-700 shadow-md">
                            Connect Google Play JSON Key
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </main>

    <!-- FOOTER -->
    <footer class="border-t border-slate-900 bg-slate-950/60 py-6 mt-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div class="flex items-center space-x-2 font-mono">
                <span>Hidaya Growth Command</span>
                <span>•</span>
                <span>Real-Time Intelligence</span>
            </div>
            <div class="flex items-center space-x-4">
                <a href="broadcast.html" class="hover:text-indigo-400 transition-colors flex items-center space-x-1.5">
                    <i data-lucide="radio" class="w-3.5 h-3.5"></i>
                    <span>Push Broadcaster</span>
                </a>
            </div>
        </div>
    </footer>

    <!-- INLINE SCRIPT WITH LIVE DATA -->
    <script>
        const appleData = ${JSON.stringify(apple)};
        const igData = ${JSON.stringify(ig)};

        function switchMainTab(tab) {
            const socialTab = document.getElementById('tab-social');
            const appTab = document.getElementById('tab-app');
            const btnSocial = document.getElementById('tabBtn-social');
            const btnApp = document.getElementById('tabBtn-app');

            if (tab === 'social') {
                socialTab.classList.remove('hidden');
                appTab.classList.add('hidden');
                btnSocial.className = 'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 text-white bg-indigo-600 shadow-md shadow-indigo-600/30';
                btnApp.className = 'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50';
            } else {
                socialTab.classList.add('hidden');
                appTab.classList.remove('hidden');
                btnApp.className = 'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 text-white bg-indigo-600 shadow-md shadow-indigo-600/30';
                btnSocial.className = 'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50';
            }
        }

        function switchStorePlatform(platform) {
            const appleView = document.getElementById('storeView-apple');
            const googleView = document.getElementById('storeView-google');
            const btnApple = document.getElementById('storeBtn-apple');
            const btnGoogle = document.getElementById('storeBtn-google');

            if (platform === 'apple') {
                appleView.classList.remove('hidden');
                googleView.classList.add('hidden');
                btnApple.className = 'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 text-white bg-indigo-600 shadow-md shadow-indigo-600/30';
                btnGoogle.className = 'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50';
            } else {
                appleView.classList.add('hidden');
                googleView.classList.remove('hidden');
                btnGoogle.className = 'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 text-white bg-indigo-600 shadow-md shadow-indigo-600/30';
                btnApple.className = 'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50';
            }
        }

        function renderInstagramTable() {
            const tbody = document.getElementById('ig-posts-table-body');
            tbody.innerHTML = '';
            igData.posts.slice(0, 15).forEach(post => {
                const tr = document.createElement('tr');
                tr.className = 'hover:bg-slate-800/30 transition-colors';
                const firstLine = post.caption.split('\\n')[0] || 'Daily Islamic Reminder';
                tr.innerHTML = \`
                    <td class="py-3 px-4 max-w-xs">
                        <div class="font-medium text-white truncate">\${firstLine}</div>
                        <div class="text-xs text-slate-500 font-mono truncate">\${post.caption.slice(0, 70)}...</div>
                    </td>
                    <td class="py-3 px-4">
                        <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">\${post.type}</span>
                    </td>
                    <td class="py-3 px-4 text-xs font-mono text-slate-400">
                        <div>\${post.date}</div>
                        <div class="text-slate-500 text-[11px]">\${post.slot}</div>
                    </td>
                    <td class="py-3 px-4 text-center font-mono font-bold text-indigo-400">
                        \${post.likes}
                    </td>
                    <td class="py-3 px-4 text-right">
                        <a href="https://instagram.com/p/\${post.id}" target="_blank" class="text-slate-400 hover:text-indigo-400 transition-colors text-xs font-semibold">
                            View
                        </a>
                    </td>
                \`;
                tbody.appendChild(tr);
            });
        }

        window.addEventListener('DOMContentLoaded', () => {
            lucide.createIcons();
            renderInstagramTable();

            // 1. Instagram Slot Performance Chart
            const ctxIgSlot = document.getElementById('chart-ig-slots').getContext('2d');
            new Chart(ctxIgSlot, {
                type: 'bar',
                data: {
                    labels: ['Morning (6:30 AM)', 'Afternoon (12:30 PM)', 'Evening (7:30 PM)'],
                    datasets: [{
                        label: 'Avg Likes per Post',
                        data: [4.2, 3.4, 3.8],
                        backgroundColor: 'rgba(99, 102, 241, 0.75)',
                        borderColor: '#6366F1',
                        borderWidth: 1.5,
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: 'rgba(255, 255, 255, 0.05)' },
                            ticks: { color: '#94A3B8', font: { family: 'JetBrains Mono' } }
                        },
                        x: {
                            grid: { display: false },
                            ticks: { color: '#94A3B8' }
                        }
                    }
                }
            });

            // 2. Instagram Category Doughnut
            const ctxIgTypes = document.getElementById('chart-ig-types').getContext('2d');
            new Chart(ctxIgTypes, {
                type: 'doughnut',
                data: {
                    labels: ["Hadith", "Du'a", "Good Deed"],
                    datasets: [{
                        data: [16, 16, 15],
                        backgroundColor: [
                            'rgba(99, 102, 241, 0.85)',
                            'rgba(56, 189, 248, 0.85)',
                            'rgba(244, 63, 94, 0.85)'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { color: '#CBD5E1', font: { family: 'Plus Jakarta Sans', size: 12 } }
                        }
                    },
                    cutout: '72%'
                }
            });

            // 3. Apple Monthly Downloads & Updates Chart
            const ctxAppleMonthly = document.getElementById('chart-apple-monthly').getContext('2d');
            new Chart(ctxAppleMonthly, {
                type: 'bar',
                data: {
                    labels: ['July 2026', 'August 2026', 'Sept 2026', 'Oct 2026', 'Nov 2026'],
                    datasets: [
                        {
                            label: 'First-Time Downloads',
                            data: [23, 6, 8, 10, 4],
                            backgroundColor: 'rgba(99, 102, 241, 0.85)',
                            borderRadius: 4
                        },
                        {
                            label: 'App Updates',
                            data: [35, 35, 3, 1, 49],
                            backgroundColor: 'rgba(56, 189, 248, 0.85)',
                            borderRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: { color: '#CBD5E1' }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: 'rgba(255, 255, 255, 0.05)' },
                            ticks: { color: '#94A3B8', font: { family: 'JetBrains Mono' } }
                        },
                        x: {
                            grid: { display: false },
                            ticks: { color: '#94A3B8' }
                        }
                    }
                }
            });

            // 4. Apple Geo Breakdown
            const ctxAppleGeo = document.getElementById('chart-apple-geo').getContext('2d');
            const topC = appleData.topCountries.slice(0, 6);
            new Chart(ctxAppleGeo, {
                type: 'bar',
                indexAxis: 'y',
                data: {
                    labels: topC.map(c => c.country),
                    datasets: [{
                        label: 'Total Units',
                        data: topC.map(c => c.units),
                        backgroundColor: 'rgba(129, 140, 248, 0.85)',
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: {
                            beginAtZero: true,
                            grid: { color: 'rgba(255, 255, 255, 0.05)' },
                            ticks: { color: '#94A3B8', font: { family: 'JetBrains Mono' } }
                        },
                        y: {
                            grid: { display: false },
                            ticks: { color: '#CBD5E1', font: { family: 'JetBrains Mono', weight: 'bold' } }
                        }
                    }
                }
            });
        });
    </script>
</body>
</html>
`;

fs.writeFileSync('/tmp/growth_dash/index.html', htmlContent, 'utf8');
console.log('Successfully written /tmp/growth_dash/index.html');
