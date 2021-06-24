<doc-view>

<h2 id="_introduction">Introduction</h2>
<div class="section">
<p>Most of the Helidon documentation is Linux/Mac/Unix centric. This document gives
some tips for Windows users.</p>

</div>

<h2 id="_prerequisites">Prerequisites</h2>
<div class="section">
<p>Windows 10 is required.</p>

<p>For general pre-requisites like Java and Maven see <router-link to="/about/03_prerequisites">Getting Started</router-link>.
If you want to use the <router-link to="/about/05_cli">Helidon CLI</router-link> you&#8217;ll also need to install the
Visual C++ Redistributable Runtime:</p>

<ul class="ulist">
<li>
<p><a id="" title="" target="_blank" href="https://aka.ms/vs/16/release/vc_redist.x64.exe">x64</a></p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://aka.ms/vs/16/release/vc_redist.x86.exe">x86</a></p>

</li>
</ul>
<p>We also recommend installing the following from the Microsoft Store:</p>

<ul class="ulist">
<li>
<p>PowerShell</p>

</li>
<li>
<p>Windows Terminal</p>

</li>
</ul>
<p>This document assumes you will be using PowerShell.</p>

</div>

<h2 id="_maven_quickstart_archetypes">Maven Quickstart Archetypes</h2>
<div class="section">

<h3 id="_helidon_se">Helidon SE</h3>
<div class="section">
<markup
lang="bash"

>mvn "-U" "archetype:generate" "-DinteractiveMode=false" `
    "-DarchetypeGroupId=io.helidon.archetypes" `
    "-DarchetypeArtifactId=helidon-quickstart-se" `
    "-DarchetypeVersion=2.3.1" `
    "-DgroupId=io.helidon.examples" `
    "-DartifactId=helidon-quickstart-se" `
    "-Dpackage=io.helidon.examples.quickstart.se"</markup>

<p>You can then follow the instructions in the <router-link to="/se/guides/02_quickstart">Helidon SE Quickstart</router-link>. If
you do not have <code>curl</code> installed you can use <code>Invoke-WebRequest</code>:</p>

<markup
lang="bash"

>Invoke-WebRequest -Uri "http://localhost:8080/greet"</markup>

</div>

<h3 id="_helidon_mp">Helidon MP</h3>
<div class="section">
<markup
lang="bash"

>mvn "-U" "archetype:generate" "-DinteractiveMode=false" `
    "-DarchetypeGroupId=io.helidon.archetypes" `
    "-DarchetypeArtifactId=helidon-quickstart-mp" `
    "-DarchetypeVersion=2.3.1" `
    "-DgroupId=io.helidon.examples" `
    "-DartifactId=helidon-quickstart-mp" `
    "-Dpackage=io.helidon.examples.quickstart.mp"</markup>

<p>You can then follow the instructions in the <router-link to="/mp/guides/02_quickstart">Helidon MP Quickstart</router-link>. If
you do not have <code>curl</code> installed you can use <code>Invoke-WebRequest</code>:</p>

<markup
lang="bash"

>Invoke-WebRequest -Uri "http://localhost:8080/greet"</markup>

</div>
</div>
</doc-view>