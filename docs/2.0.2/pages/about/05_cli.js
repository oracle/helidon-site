<doc-view>

<h2 id="_introduction">Introduction</h2>
<div class="section">
<p>The Helidon CLI lets you easily create a Helidon project by picking from a
set of archetypes. It also supports a developer loop that performs continuous
compilation and application restart, so you can easily iterate over source
code changes.</p>

<p>The CLI is distributed as a standalone executable (compiled using GraalVM) for
ease of installation. It is currently available as download for Linux and Mac.
Simply download the binary, install it at a location accessible from your PATH
and you’re ready to go.</p>

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

<p>Windows builds to come.</p>

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