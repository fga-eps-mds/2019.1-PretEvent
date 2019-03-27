FROM ruby:2.5

WORKDIR /ghpages

ADD . /ghpages/

RUN bundle install 

CMD bundle exec jekyll serve
