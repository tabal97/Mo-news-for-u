const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('returns an array with the correctly formatted object for a single element passed', () => {
    const input = [{
      title: 'The vegan carnivore?',
      topic: 'cooking',
      author: 'tickle122',
      body: 'The chef Richard McGeown has faced bigger culinary challenges in his distinguished career than frying a meat patty in a little sunflower oil and butter. But this time the eyes and cameras of hundreds of journalists in the room were fixed on the 5oz (140g) pink disc sizzling in his pan, one that had been five years and €250,000 in the making. This was the world’s first proper portion of cultured meat, a beef burger created by Mark Post, professor of physiology, and his team at Maastricht University in the Netherlands. Post (which rhymes with ‘lost’, not ‘ghost’) has been working on in vitro meat (IVM) since 2009. On 5 August this year he presented his cultured beef burger to the world as a ‘proof of concept’. Having shown that the technology works, Post believes that in a decade or so we could see commercial production of meat that has been grown in a lab rather than reared and slaughtered. The comforting illusion that supermarket trays of plastic-wrapped steaks are not pieces of dead animal might become a discomforting reality.',
      created_at: 1492163783248
    }];
    const actualValue = formatDates(input);
    const expected = [{
      title: 'The vegan carnivore?',
      topic: 'cooking',
      author: 'tickle122',
      body: 'The chef Richard McGeown has faced bigger culinary challenges in his distinguished career than frying a meat patty in a little sunflower oil and butter. But this time the eyes and cameras of hundreds of journalists in the room were fixed on the 5oz (140g) pink disc sizzling in his pan, one that had been five years and €250,000 in the making. This was the world’s first proper portion of cultured meat, a beef burger created by Mark Post, professor of physiology, and his team at Maastricht University in the Netherlands. Post (which rhymes with ‘lost’, not ‘ghost’) has been working on in vitro meat (IVM) since 2009. On 5 August this year he presented his cultured beef burger to the world as a ‘proof of concept’. Having shown that the technology works, Post believes that in a decade or so we could see commercial production of meat that has been grown in a lab rather than reared and slaughtered. The comforting illusion that supermarket trays of plastic-wrapped steaks are not pieces of dead animal might become a discomforting reality.',
      created_at: new Date(1492163783248)
    }];
    expect(actualValue).to.eql(expected)
  });
  it('return an array of correctly formatted dates in the objects for many elements', () => {
    const input = [{
      title: 'The vegan carnivore?',
      topic: 'cooking',
      author: 'tickle122',
      body: 'The chef Richard McGeown has faced bigger culinary challenges in his distinguished career than frying a meat patty in a little sunflower oil and butter. But this time the eyes and cameras of hundreds of journalists in the room were fixed on the 5oz (140g) pink disc sizzling in his pan, one that had been five years and €250,000 in the making. This was the world’s first proper portion of cultured meat, a beef burger created by Mark Post, professor of physiology, and his team at Maastricht University in the Netherlands. Post (which rhymes with ‘lost’, not ‘ghost’) has been working on in vitro meat (IVM) since 2009. On 5 August this year he presented his cultured beef burger to the world as a ‘proof of concept’. Having shown that the technology works, Post believes that in a decade or so we could see commercial production of meat that has been grown in a lab rather than reared and slaughtered. The comforting illusion that supermarket trays of plastic-wrapped steaks are not pieces of dead animal might become a discomforting reality.',
      created_at: new Date(1492163783248)
    },
    {
      title: 'Stone Soup',
      topic: 'cooking',
      author: 'cooljmessy',
      body: 'The first day I put my family on a Paleolithic diet, I made my kids fried eggs and sausage for breakfast. If they were still hungry, I told them, they could help themselves to more sausage, but they were not allowed to grab a slice of bread, or toast an English muffin, or pour themselves a bowl of cereal. This represented a reversal of the usual strictures, and they were happy to oblige. It was like some weird, unexpected holiday—Passover in July.',
      created_at: 1481662720516
    }, {
      title: 'The Notorious MSG’s Unlikely Formula For Success',
      topic: 'cooking',
      author: 'grumpy19',
      body: "The 'umami' craze has turned a much-maligned and misunderstood food additive into an object of obsession for the world’s most innovative chefs. But secret ingredient monosodium glutamate’s biggest secret may be that there was never anything wrong with it at all.",
      created_at: 1502921310430
    }];
    const actualValue = formatDates(input);
    const expected = [{
      title: 'The vegan carnivore?',
      topic: 'cooking',
      author: 'tickle122',
      body: 'The chef Richard McGeown has faced bigger culinary challenges in his distinguished career than frying a meat patty in a little sunflower oil and butter. But this time the eyes and cameras of hundreds of journalists in the room were fixed on the 5oz (140g) pink disc sizzling in his pan, one that had been five years and €250,000 in the making. This was the world’s first proper portion of cultured meat, a beef burger created by Mark Post, professor of physiology, and his team at Maastricht University in the Netherlands. Post (which rhymes with ‘lost’, not ‘ghost’) has been working on in vitro meat (IVM) since 2009. On 5 August this year he presented his cultured beef burger to the world as a ‘proof of concept’. Having shown that the technology works, Post believes that in a decade or so we could see commercial production of meat that has been grown in a lab rather than reared and slaughtered. The comforting illusion that supermarket trays of plastic-wrapped steaks are not pieces of dead animal might become a discomforting reality.',
      created_at: new Date(1492163783248)
    },
    {
      title: 'Stone Soup',
      topic: 'cooking',
      author: 'cooljmessy',
      body: 'The first day I put my family on a Paleolithic diet, I made my kids fried eggs and sausage for breakfast. If they were still hungry, I told them, they could help themselves to more sausage, but they were not allowed to grab a slice of bread, or toast an English muffin, or pour themselves a bowl of cereal. This represented a reversal of the usual strictures, and they were happy to oblige. It was like some weird, unexpected holiday—Passover in July.',
      created_at: new Date(1481662720516)
    }, {
      title: 'The Notorious MSG’s Unlikely Formula For Success',
      topic: 'cooking',
      author: 'grumpy19',
      body: "The 'umami' craze has turned a much-maligned and misunderstood food additive into an object of obsession for the world’s most innovative chefs. But secret ingredient monosodium glutamate’s biggest secret may be that there was never anything wrong with it at all.",
      created_at: new Date(1502921310430)
    }];
    expect(actualValue).to.eql(expected)
  });
  it('does not mutate the original array of objects', () => {
    const input = [{
      title: 'The vegan carnivore?',
      topic: 'cooking',
      author: 'tickle122',
      body: 'The chef Richard McGeown has faced bigger culinary challenges in his distinguished career than frying a meat patty in a little sunflower oil and butter. But this time the eyes and cameras of hundreds of journalists in the room were fixed on the 5oz (140g) pink disc sizzling in his pan, one that had been five years and €250,000 in the making. This was the world’s first proper portion of cultured meat, a beef burger created by Mark Post, professor of physiology, and his team at Maastricht University in the Netherlands. Post (which rhymes with ‘lost’, not ‘ghost’) has been working on in vitro meat (IVM) since 2009. On 5 August this year he presented his cultured beef burger to the world as a ‘proof of concept’. Having shown that the technology works, Post believes that in a decade or so we could see commercial production of meat that has been grown in a lab rather than reared and slaughtered. The comforting illusion that supermarket trays of plastic-wrapped steaks are not pieces of dead animal might become a discomforting reality.',
      created_at: new Date(1492163783248)
    },
    {
      title: 'Stone Soup',
      topic: 'cooking',
      author: 'cooljmessy',
      body: 'The first day I put my family on a Paleolithic diet, I made my kids fried eggs and sausage for breakfast. If they were still hungry, I told them, they could help themselves to more sausage, but they were not allowed to grab a slice of bread, or toast an English muffin, or pour themselves a bowl of cereal. This represented a reversal of the usual strictures, and they were happy to oblige. It was like some weird, unexpected holiday—Passover in July.',
      created_at: 1481662720516
    }, {
      title: 'The Notorious MSG’s Unlikely Formula For Success',
      topic: 'cooking',
      author: 'grumpy19',
      body: "The 'umami' craze has turned a much-maligned and misunderstood food additive into an object of obsession for the world’s most innovative chefs. But secret ingredient monosodium glutamate’s biggest secret may be that there was never anything wrong with it at all.",
      created_at: 1502921310430
    }];
    const actualValue = formatDates(input);
    const expected = [{
      title: 'The vegan carnivore?',
      topic: 'cooking',
      author: 'tickle122',
      body: 'The chef Richard McGeown has faced bigger culinary challenges in his distinguished career than frying a meat patty in a little sunflower oil and butter. But this time the eyes and cameras of hundreds of journalists in the room were fixed on the 5oz (140g) pink disc sizzling in his pan, one that had been five years and €250,000 in the making. This was the world’s first proper portion of cultured meat, a beef burger created by Mark Post, professor of physiology, and his team at Maastricht University in the Netherlands. Post (which rhymes with ‘lost’, not ‘ghost’) has been working on in vitro meat (IVM) since 2009. On 5 August this year he presented his cultured beef burger to the world as a ‘proof of concept’. Having shown that the technology works, Post believes that in a decade or so we could see commercial production of meat that has been grown in a lab rather than reared and slaughtered. The comforting illusion that supermarket trays of plastic-wrapped steaks are not pieces of dead animal might become a discomforting reality.',
      created_at: new Date(1492163783248)
    },
    {
      title: 'Stone Soup',
      topic: 'cooking',
      author: 'cooljmessy',
      body: 'The first day I put my family on a Paleolithic diet, I made my kids fried eggs and sausage for breakfast. If they were still hungry, I told them, they could help themselves to more sausage, but they were not allowed to grab a slice of bread, or toast an English muffin, or pour themselves a bowl of cereal. This represented a reversal of the usual strictures, and they were happy to oblige. It was like some weird, unexpected holiday—Passover in July.',
      created_at: new Date(1481662720516)
    }, {
      title: 'The Notorious MSG’s Unlikely Formula For Success',
      topic: 'cooking',
      author: 'grumpy19',
      body: "The 'umami' craze has turned a much-maligned and misunderstood food additive into an object of obsession for the world’s most innovative chefs. But secret ingredient monosodium glutamate’s biggest secret may be that there was never anything wrong with it at all.",
      created_at: new Date(1502921310430)
    }];
    expect(actualValue).to.not.equal(expected)
  });
});

describe('makeRefObj', () => {
  it('returns an empty object when an empty array is passed', () => {
    const input = [];
    const actualValue = makeRefObj(input);
    const expectedValue = {};
    expect(actualValue).to.eql(expectedValue);
  });
  it('returns a reference object with one key-value pair when an array with one element is passed', () => {
    const input = [{ name: "Mo", age: 22 }];
    const actualValue = makeRefObj(input, "name", "age");
    const expectedValue = { Mo: 22 };
    expect(actualValue).to.deep.equal(expectedValue)
  });
  it('returns a reference object with one key-value pair when an array with one element is passed', () => {
    const input = [{ name: "Mo", age: 22 }, { name: "Samantha", sex: "female", age: 21 }, { name: "Oscar", school: "...of Rock", age: 12 }];
    const actualValue = makeRefObj(input, "name", "age");
    const expectedValue = { Mo: 22, Samantha: 21, Oscar: 12 };
    expect(actualValue).to.deep.equal(expectedValue)
  });
  it('does not mutate the array passed', () => {
    const input = [{ name: "Mo", age: 22 }, { name: "Samantha", sex: "female", age: 21 }, { name: "Oscar", school: "...of Rock", age: 12 }];
    const actualValue = makeRefObj(input, "name", "age");
    const expectedValue = { Mo: 22, Samantha: 21, Oscar: 12 };
    expect(actualValue).to.not.equal(expectedValue)
  });
});

describe('formatComments', () => {
  it('returns an empty array when this is passed', () => {
    const array = [];
    const refObj = {};
    const actualValue = formatComments(array, refObj);
    const expectedValue = [];
    expect(actualValue).to.deep.equal(expectedValue)
  });
  it('should rename any "created_by" key with an "author" key', () => {
    const array = [{ created_by: "Mo Farah", last_read: "tuesday" }, { first_read: "last friday", created_by: "Jimmy Kimmel" }];
    const refObj = {};
    const actualValue = formatComments(array, refObj);
    actualValue.forEach((obj) => {
      expect(obj).to.have.any.keys('author');
    })
  });
  it('should rename any "belongs_to" and "created_by" keys with "article_id" annd "author" keys respectively ', () => {
    const array = [{ belongs_to: "Me", created_by: "Tristan" }, { created_by: "the_public", belongs_to: "the_people" }];
    const refObj = {};
    const actualValue = formatComments(array, refObj);
    actualValue.forEach((obj) => {
      expect(obj).to.include.keys('author', 'article_id');
    })
  });
  it('should replace the value of the article_id key with the corresponding title in the reference object passed ', () => {
    const array = [{ belongs_to: "Me", created_by: "Tristan" }, { created_by: "the_public", belongs_to: "the_people" }];
    const refObj = { Me: "Myself", the_people: "You" };
    const actualValue = formatComments(array, refObj);
    const expectedValue = [{ article_id: "Myself", author: "Tristan" }, { article_id: "You", author: "the_public" }];
    expect(actualValue).to.eql(expectedValue);
  });
  it('should replace the value of the article_id key with the corresponding title in the reference object passed ', () => {
    const array = [{ belongs_to: "Me", created_by: "Tristan" }, { created_by: "the_public", belongs_to: "the_people" }];
    const refObj = { Me: "Myself", the_people: "You" };
    const actualValue = formatComments(array, refObj);
    const expectedValue = [{ article_id: "Myself", author: "Tristan" }, { article_id: "You", author: "the_public" }];
    expect(actualValue).to.eql(expectedValue);
  });
  it('does not mutate the the array passed ', () => {
    const array = [{ belongs_to: "Me", created_by: "Tristan" }, { created_by: "the_public", belongs_to: "the_people" }];
    const refObj = { Me: "Myself", the_people: "You" };
    const actualValue = formatComments(array, refObj);
    const expectedValue = [{ article_id: "Myself", author: "Tristan" }, { article_id: "You", author: "the_public" }];
    expect(actualValue).to.not.equal(expectedValue);
  });
});
