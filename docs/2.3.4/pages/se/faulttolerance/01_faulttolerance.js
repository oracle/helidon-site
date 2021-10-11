<doc-view>

<h2 id="maven-coordinates">Maven Coordinates</h2>
<div class="section">
<p>To enable Fault Tolerance
add the following dependency to your project&#8217;s <code>pom.xml</code> (see <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link>).</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.fault-tolerance&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-fault-tolerance&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_introduction">Introduction</h2>
<div class="section">
<p>Helidon SE Fault Tolerance support is inspired by <a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-fault-tolerance-2.1.1/microprofile-fault-tolerance-spec.html">MicroProfile Fault Tolerance</a>.
The API defines the notion of a <em>fault handler</em> that can be combined with other handlers to
improve application robustness. Handlers are created to manage error conditions (faults)
that may occur in real-world application environments. Examples include service restarts,
network delays, temporal infrastructure instabilities, etc.</p>

<p>The interaction of multiple microservices bring some new challenges from distributed systems
that require careful planning. Faults in distributed systems should be compartmentalized
to avoid unnecessary service interruptions. For example, if comparable information can
be obtained from multiples sources, a user request <em>should not</em> be denied when a subset
of these sources is unreachable or offline. Similarly, if a non-essential source has been
flagged as unreachable, an application should avoid continuous access to that source
as that would result in much higher response times.</p>

<p>In order to combat the most common types of application faults, the Helidon SE Fault Tolerance API
provides support for circuit breakers, retries, timeouts, bulkheads and fallbacks.
In addition, the API makes it very easy to create and monitor asynchronous tasks that
do not require explicit creation and management of threads/executors.</p>

<p>For more information the reader is referred to the
<a id="" title="" target="_blank" href="./apidocs/io.helidon.faulttolerance/io/helidon/faulttolerance/package-summary.html">Fault Toleance SE API Javadocs</a>.</p>


<h3 id="_updating_your_pom">Updating your POM</h3>
<div class="section">
<p>In order to use Fault Tolerance you first need to add the <router-link to="#maven-coordinates" @click.native="this.scrollFix('#maven-coordinates')">maven dependency</router-link> to
your <code>pom.xml</code>.</p>

</div>

<h3 id="_singlet_and_multit">Single&lt;T&gt; and Multi&lt;T&gt;</h3>
<div class="section">
<p>In what follows we shall assume the reader is familiar with the two core Helidon types
<code>Single&lt;T&gt;</code> and <code>Multi&lt;T&gt;</code> from the <a id="" title="" target="_blank" href="./apidocs/io.helidon.common.reactive/io/helidon/common/reactive/package-summary.html">io.helidon.common.reactive</a>
package. Most simply,
a <code>Single&lt;T&gt;</code> is a promise to produce zero or one value of type <code>T</code> or signal an error;
while a <code>Multi&lt;T&gt;</code> is a promise to produce zero or more values of type <code>T</code> or signal an error.
More generally, these two types can be regarded as <em>producers</em> of zero or more values of type
<code>T</code>.</p>

<div class="admonition note">
<p class="admonition-inline">Note also that <code>Single&lt;T&gt;</code>, like <code>CompletableFuture&lt;T&gt;</code>, extends <code>CompletionStage&lt;T&gt;</code>
 so conversion among these types is straightforward.</p>
</div>
<p>We shall use all these types in connection with Fault Tolerance handlers in the next few
sections.</p>

</div>

<h3 id="_asynchronous">Asynchronous</h3>
<div class="section">
<p>Asynchronous tasks can be created or forked by using an <code>Async</code> instance. A supplier of type
<code>T</code> is provided as the argument when invoking this handler. For example:</p>

<markup
lang="java"

>Single&lt;Thread&gt; s = Async.create().invoke(() -&gt; Thread.currentThread()));
s.thenAccept(t -&gt; System.out.println("Async task executed in thread " + t));</markup>

<p>The supplier <code>() &#8594; Thread.currentThread()</code> is executed in a new thread and
the value it produces printed by the consumer and passed to <code>thenAccept</code>.</p>

<div class="admonition note">
<p class="admonition-inline">The method reference <code>Thread::currentThread</code> is a simplified way of
providing a supplier in the example above.</p>
</div>
<p>Asynchronous tasks are executed in a thread pool managed by the Helidon SE
Fault Tolerance module. Thread pools are created during the initialization
phase of class <code>io.helidon.faulttolerance.FaultTolerance</code> and can be
configured for your application.</p>

</div>

<h3 id="_retries">Retries</h3>
<div class="section">
<p>Temporal networking problems can sometimes be mitigated by simply retrying
a certain task. A <code>Retry</code> handler is created using a <code>RetryPolicy</code> that
indicates the number of retries, delay between retries, etc.</p>

<markup
lang="java"

>Retry retry = Retry.builder()
                   .retryPolicy(Retry.JitterRetryPolicy.builder()
                                     .calls(3)
                                     .delay(Duration.ofMillis(100))
                                     .build())
                   .build();
retry.invoke(this::retryOnFailure);</markup>

<p>The sample code above will retry calls to the supplier <code>this::retryOnFailure</code>
for up to 3 times with a 100 millisecond delay between them.</p>

<div class="admonition note">
<p class="admonition-inline">The return type of method <code>retryOnFailure</code> in the example above must
be <code>CompletionStage&lt;T&gt;</code> and the parameter to the retry handler&#8217;s <code>invoke</code>
method <code>Supplier&lt;? extends CompletionStage&lt;T&gt;&gt;</code>.</p>
</div>
<p>If the <code>CompletionStage&lt;T&gt;</code> returned by the method completes exceptionally,
the call will be treated as a failure and retried until the maximum number
of attempts is reached; finer control is
possible by creating a retry policy and using methods such as
<code>applyOn(Class&lt;? extends Throwable&gt;&#8230;&#8203; classes)</code> and
<code>skipOn(Class&lt;? extends Throwable&gt;&#8230;&#8203; classes)</code> to control those exceptions
on which to act and those that can be ignored.</p>

</div>

<h3 id="_timeouts">Timeouts</h3>
<div class="section">
<p>A request to a service that is inaccessible or simply unavailable should be bounded
to ensure a certain quality of service and response time. Timeouts can be configured
to avoid excessive waiting times. In addition, a fallback action can be defined
if a timeout expires as we shall cover in the next section.</p>

<p>The following is an example of using <code>Timeout</code>:</p>

<markup
lang="java"

>Single&lt;T&gt; s = Timeout.create(Duration.ofMillis(10)).invoke(this::mayTakeVeryLong);
s.handle((t, e) -&gt; {
    if (e instanceof TimeoutException) {
        // Invocation has timed out!
    }
    ...
});</markup>

<p>The example above monitors the call to method <code>mayTakeVeryLong</code> and reports a
<code>TimeoutException</code> if the execution takes more than 10 milliseconds to complete.</p>

</div>

<h3 id="_fallbacks">Fallbacks</h3>
<div class="section">
<p>A fallback to a <em>known</em> result can sometimes be an alternative to
reporting an error. For example, if we are unable to access a service
we may fall back to the last result obtained from that service.</p>

<p>A <code>Fallback</code> instance is created by providing a function that takes a <code>Throwable</code>
and produces a <code>CompletionStage&lt;T&gt;</code> as shown next:</p>

<markup
lang="java"

>Single&lt;T&gt; single = Fallback.create(
    throwable -&gt; Single.just(lastKnownValue).invoke(this::mayFail);
single.thenAccept(t -&gt; ...);</markup>

<p>In this example, we register a function that can produce a <code>Single&lt;T&gt;</code> (which implements
<code>CompletionStage&lt;T&gt;</code>) if the call to <code>this::mayFail</code> completes exceptionally.</p>

</div>

<h3 id="_circuit_breakers">Circuit Breakers</h3>
<div class="section">
<p>Failing to execute a certain task or call another service repeatedly can have a direct
impact on application performance. It is often preferred to avoid calls to non-essential
services by simply preventing that logic to execute altogether. A circuit breaker can be
configured to monitor such calls and block attempts that are likely to fail, thus improving
overall performance.</p>

<p>Circuit breakers start in a <em>closed</em> state, letting calls to proceed normally; after
detecting a certain number of errors during a pre-defined processing window, they can <em>open</em> to
prevent additional failures. After a circuit has been opened, it can transition
first to a <em>half-open</em> state before finally transitioning back to a closed state.
The use of an intermediate state (half-open)
makes transitions from open to close more progressive, and prevents a circuit breaker
from eagerly transitioning to states without considering "sufficient" observations.</p>

<div class="admonition note">
<p class="admonition-inline">Any failure while a circuit breaker is in half-open state will immediately
cause it to transition back to an open state.</p>
</div>
<p>Consider the following example in which <code>this::mayFail</code> is monitored by a
circuit breaker:</p>

<markup
lang="java"

>CircuitBreaker breaker = CircuitBreaker.builder()
                                       .volume(10)
                                       .errorRatio(30)
                                       .delay(Duration.ofMillis(200))
                                       .successThreshold(2)
                                       .build();
Single&lt;T&gt; result = breaker.invoke(this::mayFail);</markup>

<p>The circuit breaker in this example defines a processing window of size 10, an error
ratio of 30%, a duration to transition to half-open state of 200 milliseconds, and
a success threshold to transition from half-open to closed state of 2 observations.
It follows that,</p>

<ul class="ulist">
<li>
<p>After completing the processing window, if at least 3 errors were detected, the
circuit breaker will transition to the open state, thus blocking the execution
of any subsequent calls.</p>

</li>
<li>
<p>After 200 millis, the circuit breaker will transition back to half-open and
enable calls to proceed again.</p>

</li>
<li>
<p>If the next two calls after transitioning to half-open are successful, the
circuit breaker will transition to closed state; otherwise, it will
transition back to open state, waiting for another 200 milliseconds
before attempting to transition to half-open again.</p>

</li>
</ul>
<p>A circuit breaker will throw a
<code>io.helidon.faulttolerance.CircuitBreakerOpenException</code>
if an attempt to make an invocation takes place while it is in open state.</p>

</div>

<h3 id="_bulkheads">Bulkheads</h3>
<div class="section">
<p>Concurrent access to certain components may need to be limited to avoid
excessive use of resources. For example, if an invocation that opens
a network connection is allowed to execute concurrently without
any restriction, and if the service on the other end is slow responding,
it is possible for the rate at which network connections are opened
to exceed the maximum number of connections allowed. Faults of this
type can be prevented by guarding these invocations using a bulkhead.</p>

<div class="admonition note">
<p class="admonition-inline">The origin of the name <em>bulkhead</em> comes from the partitions that
comprise a ship&#8217;s hull. If some partition is somehow compromised
(e.g., filled with water) it can be isolated in a manner not to
affect the rest of the hull.</p>
</div>
<p>A waiting queue can be associated with a bulkhead to handle tasks
that are submitted when the bulkhead is already at full capacity.</p>

<markup
lang="java"

>Bulkhead bulkhead = Bulkhead.builder()
                            .limit(3)
                            .queueLength(5)
                            .build();
Single&lt;T&gt; single = bulkhead.invoke(this::usesResources);</markup>

<p>This example creates a bulkhead that limits concurrent execution
to <code>this:usesResources</code> to at most 3, and with a queue of size 5. The
bulkhead will report a <code>io.helidon.faulttolerance.BulkheadException</code> if unable to proceed
with the call: either due to the limit being reached or the queue
being at maximum capacity.</p>

</div>

<h3 id="_handler_composition">Handler Composition</h3>
<div class="section">
<p>Method invocations can be guarded by any combination of the handlers
presented above. For example, an invocation that
times out can be retried a few times before resorting to a fallback value
&mdash;assuming it never succeeds.</p>

<p>The easiest way to achieve handler composition is by using a builder in the
<code>FaultTolerance</code> class as shown in the following example:</p>

<markup
lang="java"

>FaultTolerance.TypedBuilder&lt;T&gt; builder = FaultTolerance.typedBuilder();

// Create and add timeout
Timeout timeout = Timeout.create(Duration.ofMillis(10));
builder.addTimeout(timeout);

// Create and add retry
Retry retry = Retry.builder()
                   .retryPolicy(Retry.JitterRetryPolicy.builder()
                                     .calls(3)
                                     .delay(Duration.ofMillis(100))
                                     .build())
                   .build();
builder.addRetry(retry);

// Create and add fallback
Fallback fallback = Fallback.create(throwable -&gt; Single.just(lastKnownValue));
builder.addFallback(fallback);

// Finally call the method
Single&lt;T&gt; single = builder.build().invoke(this::mayTakeVeryLong);</markup>

<p>The exact order in which handlers are added to a builder depends on the use case,
but generally the order starting from innermost to outermost should be: bulkhead,
timeout, circuit breaker, retry and fallback. That is, fallback is the first
handler in the chain (the last to executed once a value is returned)
and bulkhead is the last one (the first to be executed once a value is returned).</p>

<div class="admonition note">
<p class="admonition-inline">This is the ordering used by the MicroProfile Fault Tolerance implementation
in Helidon when a method is decorated with multiple annotations.</p>
</div>
</div>

<h3 id="_revisiting_multis">Revisiting Multi&#8217;s</h3>
<div class="section">
<p>All the examples presented so far have focused on invocations returning
a single value of type <code>Single&lt;T&gt;</code>. If the invocation in question can return
more than one value (i.e., a <code>Multi&lt;T&gt;</code>) then all that is needed is to use
the method <code>invokeMulti</code> instead of <code>invoke</code>. The supplier passed to this
method must return a <code>Flow.Publisher&lt;T&gt;</code> instead of a <code>CompletionStage&lt;T&gt;</code>.</p>

<p>A <code>Flow.Publisher&lt;T&gt;</code> is a generalization of a <code>Single&lt;T&gt;</code> that can
produce zero or more values. Note that a <code>Flow.Publisher&lt;T&gt;</code>, unlike a
<code>Single&lt;T&gt;</code>, can report an error after
producing one or more values, introducing additional challenges if all
values must be processed transactionally, that is, in an all or nothing
manner.</p>

<p>The following example creates an instance of <code>Retry</code> and invokes
the <code>invokeMulti</code> method, it then registers a subscriber to process
the results:</p>

<markup
lang="java"

>Retry retry = Retry.builder()
                   .retryPolicy(Retry.JitterRetryPolicy.builder()
                                     .calls(2)
                                     .build())
                   .build();
Multi&lt;Integer&gt; multi = retry.invokeMulti(() -&gt; Multi.just(0, 1, 2));

IntSubscriber ts = new IntSubscriber();
multi.subscribe(ts);
ts.request(Integer.MAX_VALUE);</markup>

<p>The call to <code>Multi.just(0, 1, 2)</code> simply returns a multi that produces
the integers 0, 1 and 2. If an error was generated during this process,
the policy will retry the call one more time &mdash;for a total of 2
calls.</p>

</div>
</div>
</doc-view>