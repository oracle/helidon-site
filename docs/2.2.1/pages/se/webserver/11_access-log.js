<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>WebServer Access Log</dt>
<dd slot="desc"><p>Access logging in Helidon is done by a dedicated module that can be
added to WebServer and configured.</p>

<p>Access logging is a Helidon WebServer <code>Service</code> and as such is executed
in the order it is registered with WebServer routing.
This implies that if you register it last and another <code>Service</code> or
<code>Handler</code> finishes the request, the service will not be invoked.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_configuring_access_log_in_your_code">Configuring Access Log in your code</h2>
<div class="section">
<p>Access log is configured in your code by registering it as a service with <code>Routing</code></p>

<markup
lang="java"

>Routing.builder()
    .register(AccessLogSupport.create(config.get("server.access-log")))
    .get("/greet", myService)</markup>

<p>The order of registration is significant - make sure <code>AccessLogSupport</code> is registered first (even before security, tracing etc.).</p>

</div>

<h2 id="_configuring_access_log_in_a_configuration_file">Configuring Access Log in a configuration file</h2>
<div class="section">
<p>Access log can be configured as follows:</p>

<markup
lang="yaml"
title="Access Log configuration file"
>server:
  port: 8080
  access-log:
    format: "%h %l %u %t %r %s %b %{Referer}i"</markup>

<p>All options shown above are also available programmatically when using builder.</p>

</div>

<h2 id="_configuration_options">Configuration options</h2>
<div class="section">
<p>The following configuration options can be defined:</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 25%;">
<col style="width: 25%;">
<col style="width: 25%;">
<col style="width: 25%;">
</colgroup>
<thead>
<tr>
<th>Config key</th>
<th>Default value</th>
<th>Builder method</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><code>enabled</code></td>
<td class=""><code>true</code></td>
<td class=""><code>enabled(boolean)</code></td>
<td class="">When this option is set to <code>false</code>, access logging will be disabled</td>
</tr>
<tr>
<td class=""><code>logger-name</code></td>
<td class=""><code>io.helidon.webserver.AccessLog</code></td>
<td class=""><code>loggerName(String)</code></td>
<td class="">Name of the logger to use when writing log entries</td>
</tr>
<tr>
<td class=""><code>format</code></td>
<td class=""><code>helidon</code></td>
<td class=""><code>helidonLogFormat()</code>, <code>commonLogFormat()</code>, <code>add(AccessLogEntry entry)</code></td>
<td class="">Configuration of access log output,
                                                        when <code>helidon</code> is defined, the Helidon log format (see below) is used.
                                                        Can be configured to explicitly define log entries (see below as well)</td>
</tr>
</tbody>
</table>
</div>
</div>

<h2 id="_supported_log_formats">Supported Log Formats</h2>
<div class="section">

<h3 id="_supported_log_entries">Supported Log Entries</h3>
<div class="section">
<p>The following log entries are supported in Helidon:</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 33.333%;">
<col style="width: 33.333%;">
<col style="width: 33.333%;">
</colgroup>
<thead>
<tr>
<th>Config format</th>
<th>Class (to use with builder)</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="">%h</td>
<td class=""><code>HostLogEntry</code></td>
<td class="">IP address of the remote host</td>
</tr>
<tr>
<td class="">%l</td>
<td class=""><code>UserIdLogEntry</code></td>
<td class="">Client identity, always undefined in Helidon</td>
</tr>
<tr>
<td class="">%u</td>
<td class=""><code>UserLogEntry</code></td>
<td class="">The username of logged-in user (when Security is used)</td>
</tr>
<tr>
<td class="">%t</td>
<td class=""><code>TimestampLogEntry</code></td>
<td class="">The current timestamp</td>
</tr>
<tr>
<td class="">%r</td>
<td class=""><code>RequestLineLogEntry</code></td>
<td class="">The request line (method, path and HTTP version)</td>
</tr>
<tr>
<td class="">%s</td>
<td class=""><code>StatusLogEntry</code></td>
<td class="">The HTTP status returned to the client</td>
</tr>
<tr>
<td class="">%b</td>
<td class=""><code>SizeLogEntry</code></td>
<td class="">The response entity size (if available)</td>
</tr>
<tr>
<td class="">%D</td>
<td class=""><code>TimeTakenLogEntry</code></td>
<td class="">The time taken in microseconds</td>
</tr>
<tr>
<td class="">%T</td>
<td class=""><code>TimeTakenLogEntry</code></td>
<td class="">The time taken in seconds</td>
</tr>
<tr>
<td class="">%{<code>header-name</code>}i</td>
<td class=""><code>HeaderLogEntry</code></td>
<td class="">Value of a header (can have multiple such specification to write
                                                     multiple headers)</td>
</tr>
</tbody>
</table>
</div>
<p>Currently we only support the entries defined above, with NO support for free text.</p>

</div>

<h3 id="_helidon_log_format">Helidon Log Format</h3>
<div class="section">
<p>When format is set to <code>helidon</code>, the format used is:</p>

<p><code>"%h %u %t %r %s %b %D"</code></p>

<p>The entries logged:</p>

<ol style="margin-left: 15px;">
<li>
IP Address

</li>
<li>
Username of a logged-in user

</li>
<li>
Timestamp

</li>
<li>
Request Line

</li>
<li>
HTTP Status code

</li>
<li>
Entity size

</li>
<li>
Time taken (microseconds)

</li>
</ol>
<p>Access log example:</p>

<div class="listing">
<pre>192.168.0.104 - [18/Jun/2019:22:28:55 +0200] "GET /greet/test HTTP/1.1" 200 53
0:0:0:0:0:0:0:1 - [18/Jun/2019:22:29:00 +0200] "GET /metrics/vendor HTTP/1.1" 200 1658
0:0:0:0:0:0:0:1 jack [18/Jun/2019:22:29:07 +0200] "PUT /greet/greeting HTTP/1.1" 200 21
0:0:0:0:0:0:0:1 jill [18/Jun/2019:22:29:12 +0200] "PUT /greet/greeting HTTP/1.1" 403 0
0:0:0:0:0:0:0:1 - [18/Jun/2019:22:29:17 +0200] "PUT /greet/greeting HTTP/1.1" 401 0</pre>
</div>

</div>

<h3 id="_common_log_format">Common Log Format</h3>
<div class="section">
<p>When format is set to <code>common</code>, the format used is:</p>

<p><code>"%h %l %u %t %r %s %b"</code></p>

<p>The entries logged:</p>

<ol style="margin-left: 15px;">
<li>
IP Address

</li>
<li>
Client identity

</li>
<li>
Username of a logged-in user

</li>
<li>
Timestamp

</li>
<li>
Request Line

</li>
<li>
HTTP Status code

</li>
<li>
Entity size

</li>
</ol>
<p>Access log example:</p>

<div class="listing">
<pre>192.168.0.104   - - [18/Jun/2019:22:28:55 +0200] "GET /greet/test HTTP/1.1" 200 53
0:0:0:0:0:0:0:1 - - [18/Jun/2019:22:29:00 +0200] "GET /metrics/vendor HTTP/1.1" 200 1658
0:0:0:0:0:0:0:1 - jack [18/Jun/2019:22:29:07 +0200] "PUT /greet/greeting HTTP/1.1" 200 21
0:0:0:0:0:0:0:1 - jill [18/Jun/2019:22:29:12 +0200] "PUT /greet/greeting HTTP/1.1" 403 0
0:0:0:0:0:0:0:1 - - [18/Jun/2019:22:29:17 +0200] "PUT /greet/greeting HTTP/1.1" 401 0</pre>
</div>

</div>
</div>

<h2 id="_configuring_access_log_with_java_util_logging">Configuring Access Log with Java util logging</h2>
<div class="section">
<p>To support a separate file for Access log entries, Helidon provides a custom
log handler, that extends the <code>FileHandler</code>.</p>

<p>To log to a file <code>access.log</code> with appending records after restart, you can use the
 following configuration in <code>logging.properties</code>:</p>

<markup
lang="properties"
title="Logging configuration file"
>io.helidon.webserver.accesslog.AccessLogHandler.level=INFO
io.helidon.webserver.accesslog.AccessLogHandler.pattern=access.log
io.helidon.webserver.accesslog.AccessLogHandler.append=true

io.helidon.webserver.AccessLog.level=INFO
io.helidon.webserver.AccessLog.useParentHandlers=false
io.helidon.webserver.AccessLog.handlers=io.helidon.webserver.accesslog.AccessLogHandler</markup>

</div>
</doc-view>