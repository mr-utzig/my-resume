<script lang="ts">
    import { Route, Router } from "svelte-navigator";
    import Terminal from "./lib/terminal/Index.svelte";
    import UserInterface from "./lib/user-interface/Index.svelte";
</script>

<Router primary={false}>
    <main>
        <Route path="/">
            <UserInterface />
        </Route>
        <Route>
            <Terminal />
        </Route>
    </main>
</Router>
