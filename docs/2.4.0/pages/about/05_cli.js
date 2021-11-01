<doc-view>

<h2 id="_introduction">Introduction</h2>
<div class="section">
<p>The Helidon CLI lets you easily create a Helidon project by picking from a
set of archetypes. It also supports a developer loop that performs continuous
compilation and application restart, so you can easily iterate over source
code changes.</p>

<p>The CLI is distributed as a standalone executable (compiled using GraalVM) for
ease of installation. It is currently available as a download for Linux, Mac and Windows.
Simply download the binary, install it at a location accessible from your PATH
and you’re ready to go.</p>

</div>

<h2 id="_prerequisites">Prerequisites</h2>
<div class="section">
<p>Helidon requires Java 11 (or newer) and Maven.</p>


<div class="table__overflow elevation-1  flex sm7
">
<table class="datatable table">
<colgroup>
<col style="width: 100%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td class=""><a id="" title="" target="_blank" href="https://www.oracle.com/technetwork/java/javase/downloads">Java&#160;SE&#160;11</a> (<a id="" title="" target="_blank" href="http://jdk.java.net">Open&#160;JDK&#160;11</a>) or newer</td>
</tr>
<tr>
<td class=""><a id="" title="" target="_blank" href="https://maven.apache.org/download.cgi">Maven 3.6.1+</a></td>
</tr>
</tbody>
</table>
</div>
<p>You should make sure <code>java</code> and <code>mvn</code> are in your path.</p>

<markup
lang="bash"

>java -version
mvn --version</markup>

</div>

<h2 id="_installation">Installation</h2>
<div class="section">
<markup
lang="bash"
title="MacOS"
>curl -O https://helidon.io/cli/latest/darwin/helidon
chmod +x ./helidon
sudo mv ./helidon /usr/local/bin/</markup>

<markup
lang="bash"
title="Linux"
>curl -O https://helidon.io/cli/latest/linux/helidon
chmod +x ./helidon
sudo mv ./helidon /usr/local/bin/</markup>

<markup
lang="powershell"
title="Windows"
>PowerShell -Command Invoke-WebRequest -Uri "https://helidon.io/cli/latest/windows/helidon.exe" -OutFile "C:\Windows\system32\helidon.exe"</markup>

<p>For Windows you will also need the Visual C++ Redistributable Runtime. See <router-link to="/about/04_windows">Helidon on Windows</router-link>
for more information.</p>

</div>

<h2 id="_create_a_new_project">Create a New Project</h2>
<div class="section">
<markup
lang="bash"

>helidon init</markup>

<p>Then answer the questions.</p>

</div>

<h2 id="_developer_loop">Developer Loop</h2>
<div class="section">
<markup
lang="bash"

>cd myproject
helidon dev</markup>

<p>As you make source code changes the project will automatically recompile and restart your
application.</p>

</div>

<h2 id="_demo">Demo</h2>
<div class="section">


<v-card>
<v-card-text class="overflow-y-hidden" style="text-align:center">
<img src="./images/cli/Helidon_cli.gif" alt="CLI Demo" />
</v-card-text>
</v-card>

</div>
</doc-view>