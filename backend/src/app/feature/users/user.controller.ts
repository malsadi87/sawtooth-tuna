import { Controller, Post, Body } from '@nestjs/common';
import { UserCreationDto } from '../../utility/dto/user-creation.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private userService: UsersService) { }

	@Post()
	async createIdea(@Body() userAndPermissionDto: UserCreationDto): Promise<any> {
		const res = await this.userService.addUser(userAndPermissionDto);
		return { id: res.user.id };
	}

	// @AllowAnonymous()
	// @Patch('/:id/user-org-permission')
	// async updateTask(@Param('id') id: number, @Body('status') orgPermission: any): Promise<any> {
	// 	return await this.userService.updatePermission(id, 1, orgPermission);
	// }
}