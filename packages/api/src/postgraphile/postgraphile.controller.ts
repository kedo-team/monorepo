import { Controller, Get, Post, Req, Next, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { PostGraphileResponseNode } from 'postgraphile'
// import { PostGraphileService } from './postgraphile.service';
import { AuthenticatedUser, Public } from 'nest-keycloak-connect'
import { middleware } from './postgraphile.middleware'


// let mw = PostGraphileService.middleware;

@Controller('/')
export class PostGraphileController {
  // constructor(private pgService: PostGraphileService) {
  //   console.log('already in controller constructor')
  //   mw = pgService.middleware;
  // }

  @Get(middleware.graphiqlRoute)
  @Public(true)
  graphiql (@Req() request: Request, @Res() response: Response, @Next() next) {
    middleware.graphiqlRouteHandler(new PostGraphileResponseNode(request, response, next));
  }

  @Post(middleware.graphqlRoute)
  @Public(true)
  graphql (@Req() request: Request, @Res() response: Response, @Next() next) {
    middleware.graphqlRouteHandler(new PostGraphileResponseNode(request, response, next));
  }
}