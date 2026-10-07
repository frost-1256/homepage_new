{
  description = "homepage_new dev shell (Bun + Node for VitePress/Workers)";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = [
            pkgs.bun
            pkgs.nodejs_22
          ];
          shellHook = ''
            echo "homepage_new shell: bun $(bun --version 2>/dev/null), node $(node --version 2>/dev/null)"
            echo "  bun install   # first time"
            echo "  bun run dev   # vitepress dev for /blog"
            echo "  bun run build # root static + /blog -> dist/"
          '';
        };
      });
}
