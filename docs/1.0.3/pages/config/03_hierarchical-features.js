<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Hierarchical Features</dt>
<dd slot="desc"><p>The config system represents configuration as a tree in memory. Many developers
will choose to work directly with config values&#8201;&#8212;&#8201;values from
the leaves in the tree&#8201;&#8212;&#8201;accessing them by their keys. You can also navigate
explicitly among the nodes of the tree without using keys.
This section describes what the tree looks like and how you can traverse
it.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_configuration_node_types">Configuration Node Types</h2>
<div class="section">
<p>The config system represents configuration in memory using three types of nodes,
each a different interface
defined within the <a id="" title="" target="_blank" href="./apidocs/index.html?io/helidon/config/spi/ConfigNode.html"><code>ConfigNode</code></a> interface.</p>

<div class="block-title"><span><code>ConfigNode</code> Types</span></div>
<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 33.333%;">
<col style="width: 33.333%;">
<col style="width: 33.333%;">
</colgroup>
<thead>
<tr>
<th>Type</th>
<th>Java Interface</th>
<th>Usage</th>
</tr>
</thead>
<tbody>
<tr>
<td>object</td>
<td><code>ConfigNode.ObjectNode</code></td>
<td>Represents complex structure (a subtree). Its child nodes can be of
any type.</td>
</tr>
<tr>
<td>list</td>
<td><code>ConfigNode.ListNode</code></td>
<td>Represents a list of nodes. Its components can be of any type.</td>
</tr>
<tr>
<td>value</td>
<td><code>ConfigNode.ValueNode</code></td>
<td>Represents a leaf node.</td>
</tr>
</tbody>
</table>
</div>
<p>A node of any type can have a <code>String</code> value.</p>

<p>Each config tree in memory will have an object node as its root with
child nodes as dictated by the source config data from which the config system
built the tree.</p>

<div class="admonition note">
<p class="admonition-textlabel">Missing Config Nodes</p>
<p ><p>If your application attempts to access a non-existent node, for example using</p>

<markup
lang="java"

>config.get("key.does.not.exist")</markup>

<p>the config system returns a <code>Config</code> node object with
type <code>MISSING</code>. The in-memory config tree contains nodes only of types <code>OBJECT</code>, <code>LIST</code>,
and <code>VALUE</code>.</p>
</p>
</div>
</div>

<h2 id="_in_memory_representation_of_configuration">In-memory Representation of Configuration</h2>
<div class="section">
<p>The following example is in <a id="" title="" target="_blank" href="https://github.com/lightbend/config/blob/master/HOCON.md">HOCON</a>
(human-optimized config object notation) format.
The config system supports HOCON as an
<router-link :to="{path: '/config/08_supported-formats', hash: '#Config-ModuleHocon'}">extension module</router-link>.</p>

<markup
lang="hocon"
title="HOCON <code>application.conf</code> file"
>app {
    greeting = "Hello"
    page-size = 20
    basic-range = [ -20, 20 ]
}
data {
    providers: [
        {
            name = "Provider1"
            class = "this.is.my.Provider1"
        },
        {
            name = "Provider2"
            class = "this.is.my.Provider2"
        }
    ]
}</markup>

<p>The diagram below illustrates the in-memory tree for that configuration.</p>


<div class="block-title"><span>Config Nodes structure of <code>application.conf</code> file</span></div>
<v-card>
<v-card-text class="overflow-y-hidden" style="text-align:center">
<img src="./images/config/application_conf-nodes.png" alt="Loaded Config Nodes structure" />
</v-card-text>
</v-card>

<v-card flat color="grey lighten-3"  class="card__example">
<v-card-text><p>Notes</p>

<ol style="margin-left: 15px;">
<li>
Each non-root node has a name which distinguishes it from other nodes with
the same parent. The interpretation of the name depends on the node type.

<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Node Type</th>
<th>Name</th>
</tr>
</thead>
<tbody>
<tr>
<td>object<br>
value</td>
<td>member name of the node within its parent</td>
</tr>
<tr>
<td>list</td>
<td>element index of the node within the containing list</td>
</tr>
</tbody>
</table>
</div>
</li>
<li>
Each node&#8217;s key is the fully-qualified path using dotted names from the root to that node.

</li>
<li>
The root has an empty key, empty name, and no value.

</li>
</ol></v-card-text>
</v-card>


<p>The <code>Config</code> object exposes methods to return the
<a id="" title="" target="_blank" href="./apidocs/index.html?io/helidon/config/Config.html#name--"><code>name</code></a>,
 <a id="" title="" target="_blank" href="./apidocs/index.html?io/helidon/config/Config.html#key--"><code>key</code></a>, and
 <a id="" title="" target="_blank" href="./apidocs/index.html?io/helidon/config/Config.html#type--"><code>type</code></a> of the
 node.</p>

</div>

<h2 id="accessByKey">Access by Key</h2>
<div class="section">
<p>For many applications, accessing configuration values by key will be the simplest approach.
If you write the code with a specific configuration structure in mind, your code can retrieve
the value from a specific configuration node very easily.</p>

<p>Your application can specify the entire navigation path as the key to a single
<code>get</code> invocation, using dotted
notation to separate the names of the nodes along the path. The code can
navigate one level at a time using chained <code>get</code> invocations, each specifying
one level of the path to the expected node. Or, you can mix the two styles.</p>

<p>All of the following lines retrieve the same <code>Config</code> node.</p>

<markup
lang="java"
title="Equivalent Config Retrievals"
>assert config.get("") == config;
Config provName1 = config.get("data.providers.0.name"); <span class="conum" data-value="1" />
Config provName2 = config.get("data.providers.0").get("name"); <span class="conum" data-value="2" />
Config provName3 = config.get("data.providers").get("0.name");
Config provName4 = config.get("data").get("providers.0").get("name");
Config provName5 = config.get("data").get("providers").get("0").get("name"); <span class="conum" data-value="3" /></markup>

<ul class="colist">
<li data-value="1">using a single key</li>
<li data-value="2">mixed style (composite key and single key)</li>
<li data-value="3">navigating one level with each <code>get</code> invocation</li>
</ul>
<p>The <code>Config.get(key)</code> method always returns a <code>Config</code> object without throwing an
exception. If the specified key does not exist the method returns a <code>Config</code> node
of type <code>MISSING</code>. There are several ways your application can tell whether a given
config value exists.</p>


<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Method</th>
<th>Usage</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>exists</code></td>
<td>Returns <code>true</code> or <code>false</code></td>
</tr>
<tr>
<td><code>ifExists</code></td>
<td>Execute functional operations for present nodes</td>
</tr>
<tr>
<td><code>type</code></td>
<td>Returns enum value for the <code>Config.Type</code>; <code>Config.Type.MISSING</code> if the node
represents a config value that <em>does not</em> exist</td>
</tr>
<tr>
<td><code>as</code></td>
<td>Returns the <code>ConfigValue</code> with the correct type that has all methods of <code>Optional</code>
    and a few additional ones - see javadoc link:./apidocs/index.html?io/helidon/config/ConfigValue.html</td>
</tr>
</tbody>
</table>
</div>
<p>The config system throws a <code>MissingValueException</code> if the application tries to
access the value of a missing node by invoking the <code>ConfigValue.get()</code> method.</p>

</div>

<h2 id="_access_by_general_navigation">Access by General Navigation</h2>
<div class="section">
<p>Some applications might need to work with configuration without knowing its
structure or key names ahead of time, and such applications can use various
methods on the <code>Config</code> class to do this.</p>

<div class="block-title"><span>General Config Node Methods</span></div>
<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Method</th>
<th>Usage</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>asNodeList()</code></td>
<td>Returns a ConfigValue&lt;List&lt;Config&gt;&gt;. For nodes of type <code>OBJECT</code> contains child nodes as a <code>List</code>.</td>
</tr>
<tr>
<td><code>hasValue()</code></td>
<td>For any node reports if the node has a value. This can be true for
any node type except <code>MISSING</code>.</td>
</tr>
<tr>
<td><code>isLeaf()</code></td>
<td>Reports whether the node has no child nodes. Leaf nodes have no children
and has a single value.</td>
</tr>
<tr>
<td><code>key()</code></td>
<td>Returns the fully-qualified path of the node using dotted notation.</td>
</tr>
<tr>
<td><code>name()</code></td>
<td>Returns the name of the node (the last part of the key).</td>
</tr>
<tr>
<td><code>asNode()</code></td>
<td>Returns a <code>ConfigValue&lt;Config&gt;</code> wrapped around the node</td>
</tr>
<tr>
<td><code>traverse()</code><br>
<code>traverse(Predicate&lt;Config&gt;)</code></td>
<td>Returns a <code>Stream&lt;Config&gt;</code> as an iterative
deepening depth-first traversal of the subtree</td>
</tr>
<tr>
<td><code>type()</code></td>
<td>Returns the <code>Type</code> enum value for the node: <code>OBJECT</code>, <code>LIST</code>, <code>VALUE</code>,
or <code>MISSING</code></td>
</tr>
</tbody>
</table>
</div>
<markup
lang="java"
title="List names of child nodes of an <em>object</em> node"
>List&lt;String&gt; appNodeNames = config.get("app")
            .asNodeList()                              <span class="conum" data-value="1" />
            .map(nodes -&gt; {                            <span class="conum" data-value="2" />
                return nodes
                        .stream()
                        .map(Config::name)
                        .sorted()
                        .collect(Collectors.toList());
            })
            .orElse(Collections.emptyList());          <span class="conum" data-value="3" />


assert appNodeNames.get(0).equals("basic-range"); <span class="conum" data-value="4" />
assert appNodeNames.get(1).equals("greeting");    <span class="conum" data-value="4" />
assert appNodeNames.get(2).equals("page-size");   <span class="conum" data-value="4" /></markup>

<ul class="colist">
<li data-value="1">Get the ConfigValue with child <code>Config</code> instances.</li>
<li data-value="2">Map the node list to names using the Java Stream API (if present)</li>
<li data-value="3">Use an empty list if the "app" node does not exist</li>
<li data-value="4">Check that the list contains the expected child names: <code>basic-range</code>, <code>greeting</code> and <code>page-size</code>.</li>
</ul>
<markup
lang="java"
title="List child nodes of a <em>list</em> node"
>List&lt;Config&gt; providers = config.get("data.providers")
        .asNodeList().orElse(Collections.emptyList());               <span class="conum" data-value="1" />

assert providers.get(0).key().toString().equals("data.providers.0"); <span class="conum" data-value="2" />
assert providers.get(1).key().toString().equals("data.providers.1"); <span class="conum" data-value="2" /></markup>

<ul class="colist">
<li data-value="1">Get child nodes of the <code>data.providers</code> <em>list</em> node as a <code>List</code> of <code>Config</code> instances.</li>
<li data-value="2">Check that the list contains the expected child nodes with keys
<code>data.providers.0</code> and <code>data.providers.1</code>.</li>
</ul>
<p>The <code>traverse()</code> method returns a stream of the nodes in the subtree that is rooted
at the current configuration node.
Depending on the structure of the loaded configuration the stream contains a mix of object, list or
 leaf value nodes.</p>

<markup
lang="java"
title="Traverse subtree below a <em>list</em> node"
>config.get("data.providers")
        .traverse()                                                             <span class="conum" data-value="1" />
        .forEach(node -&gt; System.out.println(node.type() + " \t" + node.key())); <span class="conum" data-value="2" /></markup>

<ul class="colist">
<li data-value="1">Visit the subtree rooted at the <code>data.providers</code> <em>list</em> node.</li>
<li data-value="2">Prints out following list of nodes (type and key):</li>
</ul>
<v-card flat color="grey lighten-3"  class="card__example">
<v-card-text><div class="listing">
<pre>OBJECT 	data.providers.0
VALUE 	data.providers.0.name
VALUE 	data.providers.0.class
OBJECT 	data.providers.1
VALUE 	data.providers.1.name
VALUE 	data.providers.1.class</pre>
</div>
</v-card-text>
</v-card>


<p>The optional <code>Predicate&lt;Config&gt;</code> argument to the <code>traverse</code> methods allows the
application to prune the traversal of a subtree at any point.</p>

<markup
lang="java"
title="Traverse <em>root</em> (<em>object</em>) node, skipping the entire <code>data</code> subtree"
>config.traverse(node -&gt; !node.name().equals("data"))                            <span class="conum" data-value="1" />
        .forEach(node -&gt; System.out.println(node.type() + " \t" + node.key())); <span class="conum" data-value="2" /></markup>

<ul class="colist">
<li data-value="1">Visit all <em>root</em> sub-nodes, excluding whole <code>data</code> tree structure but including
others.</li>
<li data-value="2">Prints out following list of nodes (type and key):</li>
</ul>
<v-card flat color="grey lighten-3"  class="card__example">
<v-card-text><div class="listing">
<pre>OBJECT 	app
VALUE 	app.page-size
VALUE 	app.greeting
LIST 	app.basic-range
VALUE 	app.basic-range.0
VALUE 	app.basic-range.1</pre>
</div>
</v-card-text>
</v-card>


</div>

<h2 id="_detaching_a_config_subtree">Detaching a Config Subtree</h2>
<div class="section">
<p>Sometimes it can be convenient to write part of your application to deal with
configuration without it knowing if or where the relevant configuration is plugged into
a larger config tree.</p>

<p>For example, the <router-link :to="{path: '/config/01_introduction', hash: '#create-simple-config-props'}"><code>application.properties</code></router-link>
from the introduction section contains several settings prefixed with <code>web</code> such as <code>web.page-size</code>.
Perhaps in another config source the same information might be stored as
<code>server.web.page-size</code>:</p>

<markup
lang="java"
title="Alternate Structure for Web Config"
>server.web.page-size: 40
server.web.debug = true
server.web.ratio = 1.4</markup>

<p>You might want to write the web portion of your app to work with a config subtree
with keys that are independent of the subtree&#8217;s position in a larger tree. This
would allow you to reuse the web portion of your application without change, regardless
of which structure a config source used.</p>

<p>One easy way to do this is to <em>detach</em> a subtree from a larger config tree. When
your application invokes the
<a id="" title="" target="_blank" href="./apidocs/index.html?io/helidon/config/Config.html#detach--"><code>Config.detach</code></a> method it gets back
a <em>copy</em> of the config node but with no parent. The copy and the original node both
point to the same objects for their child nodes (if any). The original node is
unchanged.</p>

<markup
lang="java"
title="Detaching a Subtree"
>Config originalRoot = // from the original example `.conf` file
Config alternateRoot = // from the alternate structure above

Config detachedFromOriginal = originalRoot.get("web").detach();
Config detachedFromAlternate = alternateRoot.get("server.web").detach();

assert originalRoot.get("web.debug").equals("true");          <span class="conum" data-value="1" />
assert alternateRoot.get("server.web.debug").equals("true");  <span class="conum" data-value="1" />

assert detachedFromOriginal.get("debug").equals("true");      <span class="conum" data-value="2" />
assert detachedFromAlternate.get("debug").equals("true");     <span class="conum" data-value="2" /></markup>

<ul class="colist">
<li data-value="1">Navigation depends on knowing the full structure of the config
and so is different for the two cases.</li>
<li data-value="2">Detaching so the <code>web</code> node is the root can use the same key
regardless of where the config subtree came from.</li>
</ul>
</div>
</doc-view>