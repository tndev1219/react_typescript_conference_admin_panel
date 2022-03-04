# Conference Admin Panel

You are creating an [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product) of a conference admin panel. It's a React-based TypeScript web application which enables conference Committee Members to manage the `Call for Papers` process.  Once the `talk proposal` is submitted, Committee Members have to read its description and then either accept or decline it.

## Setup

Follow these steps to setup the app if you complete the task localy (if enabled by your recruiter):

1. `npm install` – install dependencies
2. `npm test` – run all tests (should fail unless you fix the app)
3. `npm start` – serve the app at [http://localhost:3000/](http://localhost:3000/) (it automatically opens the app in your default browser)

There is also the `npm run test:watch` command available that starts `react-scripts-ts`/`jest` test runner in the watch mode. It enables choosing tests that are related to modified files only.

## Task

Your task is to:

1. Make tests pass by implementing missing features in the production code.

2. Make the app work in a way described below.  The majority of the code is committed but there are some missing pieces to implement.

Please, be aware there is no real backend behind the app. The app is communicating with a fake backend API defined in `src/api/fakeHttpApi.ts`.  In order to make HTTP requests, you need to call methods from `src/api/httpApi.ts`.  Fake implementations will be initialized automatically.

HTTP requests have random latency simulated – you can expect them to take from 0 to 2 seconds.

### List of proposals

`<ProposalListPage>` should be rendered under `/proposals` URL path and display list of proposals fetched from API (without any sorting nor paging applied).

1. For every proposal following data should be rendered:
   - talk title,
   - speaker's name,
   - talk category, prefixed with `category: `,
   - status description matching proposal status, one of _"rejected"_, _"accepted"_, _"to be decided"_ or _"(unknown)"_ (for any unexpected status), prefixed with `status: `,
   - color bar and label indicating whether the proposal was accepted (green), declined (red), or not decided yet (neutral),
   - button to accept proposal (if not accepted),
   - button to reject proposal (if not rejected).

    Class name of a proposal on the list has to match its status.

    The Fake API will preserve changed status of the proposal as long as a user doesn't refresh a page in a browser (navigate inside the app instead).

2. Every proposal should be clickable and should navigate on click
   to its `<ProposalDetailsPage>`.

3. Clicking on the accept or reject buttons should send an API request to change the  proposal status to `"accepted"` or `"rejected"` respectively. Proposal status on the list should be updated accordingly.

    The accept button should have a class name similar to that of reject button (already present in the code).

4. `<Loading>` should be rendered during data fetch.

5. Note that you cannot obtain a full set of required data from just one API endpoint – you cannot change the fact that proposals' data is a subset of `/talks` endpoint's response while their statuses come from `/callForPapers` endpoint.

### Proposal details

`<ProposalDetailsPage>` should be rendered under `/proposals/proposal_id` URL path (where `proposal_id` is ID of such proposal) and display details fetched from API.

1. Details to render are:
   - speaker's name,
   - talk category,
   - talk title,
   - talk description – split into separate `<p>` for each paragraph (on `\n` character),
   - button which navigates back to `<ProposalListPage>`.

2. `<Loading>` should be rendered during data fetch.

3. `<NotFound>` should be rendered if there is no proposal
    for a given `proposal_id`.

### Good Luck!

**Hint:** Changes have to be done in:

  - `src/App.tsx`,
  - files inside `src/proposals/` and its subdirectories.
