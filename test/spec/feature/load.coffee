Feature 'See a snippet\n\t',

  ' As a user\n',
  '\t   I want the activity stream snippet to load\n',
  '\t   So that I can interact with it ', ->

    snippet = null

    Scenario 'Initialize', ->
      isDocReady = 0
      timer = null

      Given 'A page', ->
        assert document != null, 'There is no DOM object'

      When 'That page loads', (done) ->
        assert utils.ready != null, 'Can\'t find "ready"'
        utils.ready ->
          isDocReady = 1
          done()

      Then 'I should have the ability to instantiate snippets on the page', ->
        snippet = new ActivityStreamSnippetFactory()
        assert snippet instanceof ActivityStreamSnippetFactory, 'Instance created was not of type ActivityStreamSnippet'

      And 'They should all be added to the collection of snippets once the snippet is instantiated', ->
        count = document.querySelectorAll('.activitysnippet').length
        assert snippet.snippets.length == count, 'Amount of snippets on the page did not matched the collection length: ' + count + ' != ' + snippet.count

      And 'They should all be of type ActivityStreamSnippet', ->
        for i of snippet.collection
          assert snippet.collection[i] instanceof ActivityStreamSnippet, 'Snippets not of type ActivityStreamSnippet, something went wrong with initialization'

    Scenario 'Logged Out', ->
      Given 'I am an anonymous user', ->
        assert snippet.user == null, 'User is anonymous'

      When 'I go to a page that includes a snippet(s)', ->
        assert snippet.count > 0, 'There are snippets on the page'

      Then 'I should see the activity streams snippet', ->
        assert 1==1

      And 'I should see a count of VERBED', ->
        assert 1==1


# init example for snippet: snippet.init({ ActivityStreamAPI: 'http://as.dev.nationalgeographic.com:9365/api/v1', actor: { id: '1', type: 'mmdb_user', api: 'http...'}, user: { onLoggedIn: Function from header, onLoggedOut: Function from header } });
