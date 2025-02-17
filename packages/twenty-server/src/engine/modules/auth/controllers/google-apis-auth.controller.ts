import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';

import { Response } from 'express';

import { GoogleAPIsProviderEnabledGuard } from 'src/engine/modules/auth/guards/google-apis-provider-enabled.guard';
import { GoogleAPIsOauthGuard } from 'src/engine/modules/auth/guards/google-apis-oauth.guard';
import { GoogleAPIsRequest } from 'src/engine/modules/auth/strategies/google-apis.auth.strategy';
import { GoogleAPIsService } from 'src/engine/modules/auth/services/google-apis.service';
import { TokenService } from 'src/engine/modules/auth/services/token.service';
import { EnvironmentService } from 'src/engine/integrations/environment/environment.service';
import { DemoEnvGuard } from 'src/engine/guards/demo.env.guard';

@Controller('auth/google-apis')
export class GoogleAPIsAuthController {
  constructor(
    private readonly googleAPIsService: GoogleAPIsService,
    private readonly tokenService: TokenService,
    private readonly environmentService: EnvironmentService,
  ) {}

  @Get()
  @UseGuards(GoogleAPIsProviderEnabledGuard, GoogleAPIsOauthGuard)
  async googleAuth() {
    // As this method is protected by Google Auth guard, it will trigger Google SSO flow
    return;
  }

  @Get('get-access-token')
  @UseGuards(GoogleAPIsProviderEnabledGuard, GoogleAPIsOauthGuard, DemoEnvGuard)
  async googleAuthGetAccessToken(
    @Req() req: GoogleAPIsRequest,
    @Res() res: Response,
  ) {
    const { user } = req;

    const { email, accessToken, refreshToken, transientToken } = user;

    const { workspaceMemberId, workspaceId } =
      await this.tokenService.verifyTransientToken(transientToken);

    if (!workspaceId) {
      throw new Error('Workspace not found');
    }

    await this.googleAPIsService.saveConnectedAccount({
      handle: email,
      workspaceMemberId: workspaceMemberId,
      workspaceId: workspaceId,
      provider: 'google',
      accessToken,
      refreshToken,
    });

    return res.redirect(
      `${this.environmentService.get('FRONT_BASE_URL')}/settings/accounts`,
    );
  }
}
