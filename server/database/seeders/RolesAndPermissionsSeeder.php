<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        app()['cache']->forget('spatie.permission.cache');

        $roleAdmin = Role::create(['name' => 'ADMIN']);
        $roleUser = Role::create(['name' => 'USER']);
        $roleSeller = Role::create(['name' => 'SELLER']);

        $permissionView = Permission::create(['name' => 'view products']);
        $permissionCreate = Permission::create(['name' => 'create products']);
        $permissionUpdate = Permission::create(['name' => 'update products']);
        $permissionDelete = Permission::create(['name' => 'delete products']);

        $roleAdmin->givePermissionTo(Permission::all());
        $roleSeller->givePermissionTo(['view products', 'create products', 'update products', 'delete products']);
    }
}
