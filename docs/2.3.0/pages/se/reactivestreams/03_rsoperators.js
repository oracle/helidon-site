<doc-view>

<h2 id="maven-coordinates">Maven Coordinates</h2>
<div class="section">
<p>To enable Reactive Streams
add the following dependency to your project&#8217;s <code>pom.xml</code> (see <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link>).</p>

<markup
lang="xml"

>&lt;dependency&gt;
   &lt;groupId&gt;io.helidon.microprofile.reactive-streams&lt;/groupId&gt;
   &lt;artifactId&gt;helidon-microprofile-reactive-streams&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_reactive_streams_operators">Reactive Streams Operators</h2>
<div class="section">
<p>Implementation of
<a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-reactive-streams-operators-1.0.1/microprofile-reactive-streams-operators-spec.html">MicroProfile Reactive Streams Operators</a>
specification. A standardised tool for manipulation with <a id="" title="" target="_blank" href="https://www.reactive-streams.org/">Reactive Streams</a>,
provides set of operators as so called stages,
and the builders to prepare graphs of stages for streams to be build from.</p>

<markup
lang="java"
title="Example of simple closed graph usage:"
>AtomicInteger sum = new AtomicInteger();

ReactiveStreams.of("1", "2", "3", "4", "5")
.limit(3)
.map(Integer::parseInt)
.forEach(sum::addAndGet)
.run()
.whenComplete((r, t) -&gt; System.out.println("Sum: " + sum.get()));

&gt; Sum: 6</markup>

<div class="block-title"><span>Operators(Stages)</span></div>
<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td class="">fromIterable</td>
<td class="">Create new PublisherBuilder from supplied Iterable</td>
</tr>
<tr>
<td class="">of</td>
<td class="">Create new PublisherBuilder emitting supplied elements</td>
</tr>
<tr>
<td class="">ofNullable</td>
<td class="">Empty stream if supplied item is null</td>
</tr>
<tr>
<td class="">iterate</td>
<td class="">Create infinite stream with every next item created by supplied operator from previous item</td>
</tr>
<tr>
<td class="">generate</td>
<td class="">Create infinite stream with every item created by invocation of supplier</td>
</tr>
<tr>
<td class="">empty</td>
<td class="">Create new PublisherBuilder emitting as a first thing complete signal</td>
</tr>
<tr>
<td class="">failed</td>
<td class="">Create new PublisherBuilder emitting as a first thing error signal</td>
</tr>
<tr>
<td class="">concat</td>
<td class="">Concat two streams</td>
</tr>
<tr>
<td class="">coupled</td>
<td class="">Two parallel streams sharing cancel, onError and onComplete signals</td>
</tr>
<tr>
<td class="">limit</td>
<td class="">Limit the size of the stream, when limit is reached completes</td>
</tr>
<tr>
<td class="">peek</td>
<td class="">Invoke consumer for every item passing this operator</td>
</tr>
<tr>
<td class="">filter</td>
<td class="">Drop item when expression result to false</td>
</tr>
<tr>
<td class="">map</td>
<td class="">Transform items</td>
</tr>
<tr>
<td class="">flatMap</td>
<td class="">Flatten supplied stream to current stream</td>
</tr>
<tr>
<td class="">flatMapIterable</td>
<td class="">Flatten supplied iterable to current stream</td>
</tr>
<tr>
<td class="">flatMapCompletionStage</td>
<td class="">Map elements to completion stage and wait for each to be completed, keeps the order</td>
</tr>
<tr>
<td class="">flatMapRSPublisher</td>
<td class="">Map elements to Publishers and flatten this sub streams to original stream</td>
</tr>
<tr>
<td class="">takeWhile</td>
<td class="">Let items pass until expression is true, first time its false completes</td>
</tr>
<tr>
<td class="">dropWhile</td>
<td class="">Drop items until expression is true, first time its false let everything pass</td>
</tr>
<tr>
<td class="">skip</td>
<td class="">Drop first n items</td>
</tr>
<tr>
<td class="">distinct</td>
<td class="">Let pass only distinct items</td>
</tr>
<tr>
<td class="">via</td>
<td class="">Connect supplied processor to current stream return supplied processor</td>
</tr>
<tr>
<td class="">onError</td>
<td class="">Invoke supplied consumer when onError signal received</td>
</tr>
<tr>
<td class="">onErrorResume</td>
<td class="">Emit one last supplied item when onError signal received</td>
</tr>
<tr>
<td class="">onErrorResumeWith</td>
<td class="">When onError signal received continue emitting from supplied publisher builder</td>
</tr>
<tr>
<td class="">onErrorResumeWithRsPublisher</td>
<td class="">When onError signal received continue emitting from supplied publisher</td>
</tr>
<tr>
<td class="">onComplete</td>
<td class="">Invoke supplied runnable when onComplete signal received</td>
</tr>
<tr>
<td class="">onTerminate</td>
<td class="">Invoke supplied runnable when onComplete or onError signal received</td>
</tr>
<tr>
<td class="">to</td>
<td class="">Connect this stream to supplied subscriber</td>
</tr>
<tr>
<td class="">toList</td>
<td class="">Collect all intercepted items to List</td>
</tr>
<tr>
<td class="">collect</td>
<td class="">Collect all intercepted items with provided collector</td>
</tr>
<tr>
<td class="">forEach</td>
<td class="">Invoke supplied Consumer for each intercepted item</td>
</tr>
<tr>
<td class="">ignore</td>
<td class="">Ignore all onNext signals, wait for onComplete</td>
</tr>
<tr>
<td class="">reduce</td>
<td class="">Reduction with provided expression</td>
</tr>
<tr>
<td class="">cancel</td>
<td class="">Cancel stream immediately</td>
</tr>
<tr>
<td class="">findFirst</td>
<td class="">Return first intercepted element</td>
</tr>
</tbody>
</table>
</div>

<h3 id="_graphs">Graphs</h3>
<div class="section">
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-reactive-streams-operators-1.0.1/microprofile-reactive-streams-operators-spec.html#_graphs">Graphs</a>
are pre-prepared stream builders with
<a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-reactive-streams-operators-1.0.1/microprofile-reactive-streams-operators-spec.html#_stages">stages</a>,
which can be combined together to closed graph with methods <code>via</code> and <code>to</code>.</p>

<markup
lang="java"
title="Combining the graphs and running the stream:"
>        // Assembly of stream, nothing is streamed yet
        PublisherBuilder&lt;String&gt; publisherStage =
                ReactiveStreams.of("foo", "bar")
                        .map(String::trim);

        ProcessorBuilder&lt;String, String&gt; processorStage =
                ReactiveStreams.&lt;String&gt;builder()
                        .map(String::toUpperCase);

        SubscriberBuilder&lt;String, Void&gt; subscriberStage =
                ReactiveStreams.&lt;String&gt;builder()
                        .map(s -&gt; "Item received: " + s)
                        .forEach(System.out::println);

        // Execution of pre-prepared stream
        publisherStage
                .via(processorStage)
                .to(subscriberStage).run();

&gt; Item received: FOO
&gt; Item received: BAR</markup>

</div>
</div>
</doc-view>