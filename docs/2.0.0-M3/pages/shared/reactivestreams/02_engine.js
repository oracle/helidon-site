<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Reactive Engine</dt>
<dd slot="desc"><p>Helidon has its own set of reactive operators that have no dependencies outside of the Helidon ecosystem.
These operators can be used with <code>java.util.concurrent.Flow</code> based reactive streams.
Stream processing operator chain can be easily constructed by <code>io.helidon.common.reactive.Multi</code>, or
<code>io.helidon.common.reactive.Single</code> for streams with single value.
Implementation was contributed to Helidon by the world-renown reactive programming expert,
project lead of RxJava and co-father of project Reactor,
<a id="" title="" target="_blank" href="https://twitter.com/akarnokd">Dr. David Karnok</a>.</p>

<markup
lang="java"
title="Example of Multi usage:"
>AtomicInteger sum = new AtomicInteger();

Multi.just("1", "2", "3", "4", "5")
        .limit(3)
        .map(Integer::parseInt)
        .forEach(sum::addAndGet);

System.out.println("Sum: " + sum.get());

&gt; Sum: 6</markup>

<markup
lang="java"
title="Example of Single usage:"
>Single.just("1")
        .map(Integer::parseInt)
        .map(i -&gt; i + 5)
        .toStage()
        .whenComplete((i, t) -&gt; System.out.println("Result: " + i));

&gt; Result: 6</markup>

<div class="block-title"><span>Operators</span></div>
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
<td class="">defer</td>
<td class="">Call the given supplier function for each individual downstream Subscriber to return a Flow.Publisher to subscribe to.</td>
</tr>
<tr>
<td class="">map</td>
<td class="">Map this <code>Multi</code> instance to a new <code>Multi</code> of another type using the given <code>Mapper</code>.</td>
</tr>
<tr>
<td class="">defaultIfEmpty</td>
<td class="">Signals the default item if the upstream is empty.</td>
</tr>
<tr>
<td class="">switchIfEmpty</td>
<td class="">Switch to the other publisher if the upstream is empty.</td>
</tr>
<tr>
<td class="">peek</td>
<td class="">Invoke provided consumer for every item in stream.</td>
</tr>
<tr>
<td class="">distinct</td>
<td class="">Filter out all duplicates.</td>
</tr>
<tr>
<td class="">filter</td>
<td class="">Filter stream items with provided predicate.</td>
</tr>
<tr>
<td class="">takeWhile</td>
<td class="">Take the longest prefix of elements from this stream that satisfy the given predicate. As long as predicate returns true, items from upstream are sent to downstream, when predicate returns false stream is completed.</td>
</tr>
<tr>
<td class="">dropWhile</td>
<td class="">Drop the longest prefix of elements from this stream that satisfy the given predicate. As long as predicate returns true, items from upstream are NOT sent to downstream but being dropped, predicate is never called again after it returns false for the first time.</td>
</tr>
<tr>
<td class="">limit</td>
<td class="">Limit stream to allow only specified number of items to pass.</td>
</tr>
<tr>
<td class="">skip</td>
<td class="">Skip first n items, all the others are emitted.</td>
</tr>
<tr>
<td class="">flatMap</td>
<td class="">Transform each upstream item with the supplied function into a <code>Flow.Publisher</code>, subscribe to them and then flatten their items into a single sequence of items emitted to the downstream.</td>
</tr>
<tr>
<td class="">flatMap</td>
<td class="">Transform each upstream item with the supplied function and flatten the resulting <code>Flow.Publisher</code> to downstream while limiting the maximum number of concurrent inner `Flow.Publisher`s and their in-flight item count, optionally aggregating and delaying all errors until all sources terminate.</td>
</tr>
<tr>
<td class="">flatMapIterable</td>
<td class="">Transform each upstream item with the supplied function and flatten the resulting <code>Iterable</code> to the downstream.</td>
</tr>
<tr>
<td class="">observeOn</td>
<td class="">Re-emit the upstream&#8217;s signals to the downstream on the given executor&#8217;s thread using a default buffer size of 32 and errors skipping ahead of items.</td>
</tr>
<tr>
<td class="">observeOn</td>
<td class="">Re-emit the upstream&#8217;s signals to the downstream on the given executor&#8217;s thread.</td>
</tr>
<tr>
<td class="">forEach</td>
<td class="">Terminal stage, invokes provided consumer for every item in the stream.</td>
</tr>
<tr>
<td class="">collectList</td>
<td class="">Collect the items of this <code>Multi</code> instance into a <code>Single</code> of <code>List</code>.</td>
</tr>
<tr>
<td class="">collect</td>
<td class="">Collect the items of this <code>Multi</code> instance into a <code>Single</code>.</td>
</tr>
<tr>
<td class="">collect</td>
<td class="">Collect the items of this <code>Multi</code> into a collection provided via a <code>Supplier</code> and mutated by a <code>BiConsumer</code> callback.</td>
</tr>
<tr>
<td class="">collectStream</td>
<td class="">Collects up upstream items with the help of the callbacks of a <code>java.util.stream.Collector</code>.</td>
</tr>
<tr>
<td class="">reduce</td>
<td class="">Combine subsequent items via a callback function and emit the final value result as a Single.</td>
</tr>
<tr>
<td class="">reduce</td>
<td class="">Combine every upstream item with an accumulator value to produce a new accumulator value and emit the final accumulator value as a Single.</td>
</tr>
<tr>
<td class="">first</td>
<td class="">Get the first item of this <code>Multi</code> instance as a <code>Single</code>.</td>
</tr>
<tr>
<td class="">from</td>
<td class="">Wrap a CompletionStage into a Multi and signal its outcome non-blockingly.</td>
</tr>
<tr>
<td class="">from</td>
<td class="">Wrap a CompletionStage into a Multi and signal its outcome non-blockingly.</td>
</tr>
<tr>
<td class="">from</td>
<td class="">Create a <code>Multi</code> instance wrapped around the given publisher.</td>
</tr>
<tr>
<td class="">from</td>
<td class="">Create a <code>Multi</code> instance that publishes the given iterable.</td>
</tr>
<tr>
<td class="">from</td>
<td class="">Create a <code>Multi</code> instance that publishes the given <code>Stream</code>.</td>
</tr>
<tr>
<td class="">just</td>
<td class="">Create a <code>Multi</code> instance that publishes the given items to a single subscriber.</td>
</tr>
<tr>
<td class="">just</td>
<td class="">Create a <code>Multi</code> instance that publishes the given items to a single subscriber.</td>
</tr>
<tr>
<td class="">singleton</td>
<td class="">Create a <code>Multi</code> that emits a pre-existing item and then completes.</td>
</tr>
<tr>
<td class="">error</td>
<td class="">Create a <code>Multi</code> instance that reports the given exception to its subscriber(s). The exception is reported by invoking <code>Subscriber#onError(java.lang.Throwable)</code> when <code>Publisher#subscribe(Subscriber)</code> is called.</td>
</tr>
<tr>
<td class="">empty</td>
<td class="">Get a <code>Multi</code> instance that completes immediately.</td>
</tr>
<tr>
<td class="">never</td>
<td class="">Get a <code>Multi</code> instance that never completes.</td>
</tr>
<tr>
<td class="">concat</td>
<td class="">Concat streams to one.</td>
</tr>
<tr>
<td class="">onTerminate</td>
<td class="">Executes given <code>java.lang.Runnable</code> when any of signals onComplete, onCancel or onError is received.</td>
</tr>
<tr>
<td class="">onComplete</td>
<td class="">Executes given <code>java.lang.Runnable</code> when onComplete signal is received.</td>
</tr>
<tr>
<td class="">onError</td>
<td class="">Executes the given java.util.function.Consumer when an onError signal is received.</td>
</tr>
<tr>
<td class="">onCancel</td>
<td class="">Executes given <code>java.lang.Runnable</code> when a cancel signal is received.</td>
</tr>
<tr>
<td class="">takeUntil</td>
<td class="">Relay upstream items until the other source signals an item or completes.</td>
</tr>
<tr>
<td class="">range</td>
<td class="">Emits a range of ever increasing integers.</td>
</tr>
<tr>
<td class="">rangeLong</td>
<td class="">Emits a range of ever increasing longs.</td>
</tr>
<tr>
<td class="">timer</td>
<td class="">Signal 0L and complete the sequence after the given time elapsed.</td>
</tr>
<tr>
<td class="">interval</td>
<td class="">Signal 0L, 1L and so on periodically to the downstream.</td>
</tr>
<tr>
<td class="">interval</td>
<td class="">Signal 0L after an initial delay, then 1L, 2L and so on periodically to the downstream.</td>
</tr>
<tr>
<td class="">timeout</td>
<td class="">Signals a <code>TimeoutException</code> if the upstream doesn&#8217;t signal the next item, error or completion within the specified time.</td>
</tr>
<tr>
<td class="">timeout</td>
<td class="">Switches to a fallback source if the upstream doesn&#8217;t signal the next item, error or completion within the specified time.</td>
</tr>
<tr>
<td class="">onErrorResume</td>
<td class=""><code>java.util.function.Function</code> providing one item to be submitted as onNext in case of onError signal is received.</td>
</tr>
<tr>
<td class="">onErrorResumeWith</td>
<td class="">Resume stream from supplied publisher if onError signal is intercepted.</td>
</tr>
<tr>
<td class="">retry</td>
<td class="">Retry a failing upstream at most the given number of times before giving up.</td>
</tr>
<tr>
<td class="">retry</td>
<td class="">Retry a failing upstream if the predicate returns true.</td>
</tr>
<tr>
<td class="">retryWhen</td>
<td class="">Retry a failing upstream when the given function returns a publisher that signals an item.</td>
</tr>
</tbody>
</table>
</div></dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h3 id="_operator_chains_composition">Operator chains composition</h3>
<div class="section">
<p>In the situations when part of the operator chain needs to be prepared in advance,
<code>compose</code> and <code>to</code> operators are at hand.</p>

<markup
lang="java"
title="Combining operator chains:"
>        // Assembly of stream, nothing is streamed yet
        Multi&lt;String&gt; publisherStage =
                Multi.just("foo", "bar")
                        .map(String::trim);

        Function&lt;Multi&lt;T&gt;, Multi&lt;T&gt;&gt; processorStage =
                upstream -&gt;
                    upstream.map(String::toUpperCase);

        // Execution of pre-prepared stream
        publisherStage
                .compose(processorStage)
                .map(s -&gt; "Item received: " + s)
                .forEach(System.out::println);

&gt; Item received: FOO
&gt; Item received: BAR</markup>

</div>

<h3 id="_dependency">Dependency</h3>
<div class="section">
<p>Declare the following dependency in your project:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.common&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-common-reactive&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>
</doc-view>